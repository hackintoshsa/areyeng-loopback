Areyeng Carpool App - Backend

Welcome to the backend of the Areyeng Carpool App, built with LoopBack 4, MongoDB, GraphQL, Twilio/Nexmo/MSG91 for OTP-based phone number verification, and SendGrid for email notifications. This app matches drivers and passengers based on personality insights using IBM Watson Personality Insights.
Overview

The Areyeng Carpool App helps users find carpool matches based on personality insights from IBM Watson Personality Insights. It’s built using LoopBack 4 to provide an extensible and secure RESTful API layer with MongoDB as the database, GraphQL for flexible queries, and integration with Twilio, Nexmo, or MSG91 for OTP-based user verification, plus SendGrid for email notifications.
Key Features:

    User Registration & OTP Verification: Register users with their phone numbers and emails, with OTP verification via Twilio, Nexmo, or MSG91.
    Personality Matching: Matches users (drivers/passengers) based on personality traits using IBM Watson Personality Insights.
    Carpool Rides: Post and search for available carpool rides.
    Ride Scheduling: Schedule and manage carpool rides.
    Email & SMS Notifications: Send email notifications via SendGrid and SMS OTP via Twilio/Nexmo/MSG91.

Setup
Prerequisites

    Node.js (v12 or higher):
        Install Node.js: Node.js Downloads.

    MongoDB:
        Use MongoDB to store user data and carpool ride details.
        You can use MongoDB Atlas (cloud-based) or install MongoDB locally.
        Set up a MongoDB Atlas cluster or run a local MongoDB server.

    IBM Watson Personality Insights:
        Sign up for IBM Watson Personality Insights and get an API key: IBM Watson Personality Insights.

    SMS Service (Twilio/Nexmo/MSG91):
        Choose a service for OTP:
            Twilio: Sign up for Twilio
            Nexmo: Sign up for Nexmo
            MSG91: Sign up for MSG91

    SendGrid:
        Set up SendGrid for email notifications: Sign up for SendGrid.

    LoopBack 4 CLI:
        Install the LoopBack 4 CLI globally to generate the app and scaffold entities:

    npm install -g @loopback/cli

Installation

    Clone the repository:

git clone https://github.com/your-org/areyeng-carpool.git
cd areyeng-carpool

Install dependencies:

npm install

Set up your environment variables:

Create a .env file at the root of your project and configure the following:

MONGO_URI=mongodb+srv://<your-mongo-uri>
IBM_WATSON_API_KEY=<your-ibm-watson-api-key>
IBM_WATSON_API_URL=<your-ibm-watson-url>
SMS_API_KEY=<your-sms-api-key>        # Twilio, Nexmo, or MSG91 API key
SMS_API_URL=<your-sms-api-url>        # Twilio, Nexmo, or MSG91 API URL
SENDGRID_API_KEY=<your-sendgrid-api-key>

Set up MongoDB: Use the MongoDB datasource to connect to your MongoDB database.

    lb4 datasource MongoDB

Tutorial

The following steps will guide you through the core tasks of building your app.
1. Create Your Application Scaffolding

Use the LoopBack 4 CLI to create the basic structure of your app.

lb4 app areyeng-carpool

2. Define Models (User, Driver, Passenger, Ride)

Use LoopBack 4 CLI to create models for your data.

lb4 model User
lb4 model Driver
lb4 model Passenger
lb4 model CarpoolRide

These models represent your app’s data structure, including user details, carpool rides, and personality insights.

Example of the User model:

// src/models/user.model.ts
import {Entity, model, property} from '@loopback/repository';

@model()
export class User extends Entity {
@property({
type: 'string',
id: true,
generated: true,
})
id?: string;

@property({
type: 'string',
required: true,
})
name: string;

@property({
type: 'string',
required: true,
})
email: string;

@property({
type: 'string',
required: true,
})
phoneNumber: string;

@property({
type: 'string',
})
personalityProfile?: string;  // IBM Watson personality data

constructor(data?: Partial<User>) {
super(data);
}
}

3. Create Repositories

Repositories handle data persistence. You can create repositories for each model, linking them to the MongoDB data source.

lb4 repository UserRepository
lb4 repository CarpoolRideRepository

4. Create Controllers (for User, Ride, Matching)

Controllers expose your data models and allow them to be accessed through RESTful APIs or GraphQL.

lb4 controller UserController
lb4 controller RideController

Example UserController for registration and OTP verification:

// src/controllers/user.controller.ts
import {repository} from '@loopback/repository';
import {post, requestBody} from '@loopback/rest';
import {UserRepository} from '../repositories';
import {User} from '../models';
import {SmsService} from '../services/sms.service';

export class UserController {
constructor(
@repository(UserRepository) public userRepository: UserRepository,
private smsService: SmsService,
) {}

@post('/users')
async createUser(@requestBody() user: User): Promise<User> {
const createdUser = await this.userRepository.create(user);
const otp = Math.floor(100000 + Math.random() * 900000).toString();
await this.smsService.sendOtp(user.phoneNumber, otp);
return createdUser;
}
}

5. Integrate IBM Watson Personality Insights

Create a service to call the IBM Watson Personality Insights API and process the results.

// src/services/personality.service.ts
import axios from 'axios';

export class PersonalityService {
async getPersonality(profile: string) {
const response = await axios.post(process.env.IBM_WATSON_API_URL, {profile}, {
headers: {
'Authorization': `Bearer ${process.env.IBM_WATSON_API_KEY}`,
},
});
return response.data;
}
}

6. Send OTP via SMS (Twilio, Nexmo, MSG91)

Create an SMS service that uses Twilio, Nexmo, or MSG91 for OTP.

// src/services/sms.service.ts
import twilio from 'twilio';

export class SmsService {
private client = twilio(process.env.SMS_API_KEY, process.env.SMS_API_URL);

async sendOtp(phoneNumber: string, otp: string) {
await this.client.messages.create({
to: phoneNumber,
from: process.env.SMS_FROM_NUMBER,
body: `Your OTP is: ${otp}`,
});
}
}

7. Send Email Notifications using SendGrid

For email notifications, use SendGrid.

// src/services/email.service.ts
import * as sgMail from '@sendgrid/mail';

export class EmailService {
constructor() {
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

async sendEmail(to: string, subject: string, text: string) {
const msg = {
to,
from: 'no-reply@areyeng.com',
subject,
text,
};
await sgMail.send(msg);
}
}

8. GraphQL Integration

To add GraphQL, you can install the LoopBack GraphQL package:

npm install @loopback/graphql

Configure GraphQL in application.ts and define the schemas for your models. Refer to the official LoopBack docs for detailed GraphQL integration.
Try it out

To run the backend locally:

    Clone the repo:

git clone https://github.com/your-org/areyeng-carpool.git
cd areyeng-carpool

Install dependencies:

npm install

Start the application:

    npm start

Your server will be running at http://127.0.0.1:3000.
Need Help?

    Join our community on Slack: LoopBack Slack
    Open an issue on our GitHub repository.

License

MIT License. See LICENSE for details.

This version now leverages LoopBack 4 for all the necessary backend services, ensuring it's integrated into the LoopBack ecosystem rather than relying on raw Express functions.