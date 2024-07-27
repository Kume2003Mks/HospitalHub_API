import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
    findAll() {
        return `
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ข้อมูลบริการแอดมิน</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        header {
            background-color: #4CAF50;
            color: white;
            padding: 10px 0;
            text-align: center;
        }
        .container {
            padding: 20px;
        }
        .services {
            display: flex;
            flex-wrap: wrap;
        }
        .service {
            flex: 1;
            min-width: 150px;
            margin: 10px;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <header>
        <h1>บริการแอดมิน</h1>
    </header>

    <div class="container">
        <section id="overview">
            <h2>ภาพรวม</h2>
            <p>ยินดีต้อนรับสู่หน้าบริการแอดมินของเรา ที่นี่คุณจะพบข้อมูลเกี่ยวกับบริการแอดมินที่เรามี</p>
        </section>

        <section id="services">
            <h2>บริการของเรา</h2>
            <div class="services">
                <div class="service">
                    <h3>บริการที่ 1</h3>
                    <p>รายละเอียดของบริการที่ 1 ซึ่งรวมถึง...</p>
                </div>
                <div class="service">
                    <h3>บริการที่ 2</h3>
                    <p>รายละเอียดของบริการที่ 2 ซึ่งรวมถึง...</p>
                </div>
                <div class="service">
                    <h3>บริการที่ 3</h3>
                    <p>รายละเอียดของบริการที่ 3 ซึ่งรวมถึง...</p>
                </div>
                <div class="service">
                    <h3>บริการที่ 4</h3>
                    <p>รายละเอียดของบริการที่ 4 ซึ่งรวมถึง...</p>
                </div>
            </div>
        </section>
    </div>
</body>
</html>
`
    }
}
