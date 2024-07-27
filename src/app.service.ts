import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Introduction to Web APIs</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        header {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 1em 0;
        }

        .container {
            padding: 1rem 18%;
        }

        h1 {
            text-align: center;
        }

        p {
            line-height: 1.6;
        }

        footer {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 1em 0;
            position: fixed;
            width: 100%;
            bottom: 0;
        }

        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>Welcome to Hostpital APIs</h1>
    </header>
    <div class="container">
        <h1>Introduction to Hostpital APIs</h1>
        <p>
            A Web API is an application programming interface for the web. It can be accessed using the HTTP protocol, making it a web service. APIs allow developers to interact with web services using standard HTTP methods such as GET, POST, PUT, and DELETE.
        </p>
        <h2>Why Use Web APIs?</h2>
        <p>
            Web APIs enable developers to access a web service's functionality and data without having to understand its internal workings. This abstraction allows for faster development and integration, as developers can use pre-built functions to perform complex operations.
        </p>
        <h2>Common Web API Examples</h2>
        <ul>
            <li>REST (Representational State Transfer)</li>
            <li>SOAP (Simple Object Access Protocol)</li>
            <li>GraphQL</li>
        </ul>
        <h2>Conclusion</h2>
        <p>
            Web APIs are a crucial component of modern web development, providing the necessary tools for creating dynamic and interactive web applications. By leveraging APIs, developers can enhance functionality, improve user experience, and streamline development processes.
        </p>
    </div>
    <footer>
        <p>&copy; 2024 --- All rights reserved.</p>
    </footer>
</body>
</html>

`;
  }
}
