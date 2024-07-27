import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {

  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) { }

  async create(createContactDto: ContactDto): Promise<Contact> {
    const newContact = new Contact();
    newContact.name = createContactDto.name;
    newContact.email = createContactDto.email;
    newContact.phone = createContactDto.phone;
    newContact.detail = createContactDto.detail;

    // Save the new contact to the database
    return await this.contactRepository.save(newContact);
  }

  findAll() {
    return this.contactRepository.find();
  }

  async findOne(id: string) {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new NotFoundException('Promotion not found');
    }
    return contact;
  }

  async remove(id: string): Promise<void> {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    await this.contactRepository.remove(contact);
  }
}
