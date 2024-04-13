"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserRegisteredEmail = (data) => {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome to University Timetable System</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        p {
            font-size: 16px;
            color: #555555;
        }
        a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to University Timetable System, ${data.fullName}!</h1>
        <p>Dear ${data.fullName},</p>
        <p>Congratulations! You have successfully registered on our university timetable platform.</p>
        <p>Thank you for joining our platform. We're excited to help you manage your academic schedule effectively.</p>
        <p>Feel free to explore your personalized timetable and manage your courses efficiently.</p>
        <p>If you have any questions or need assistance, don't hesitate to contact your university administration.</p>
        <p>Best regards,</p>
        <p>University Timetable System Team</p>
    </div>
</body>
</html>

    `;
};
const generateTimetableNotificationEmail = (student, timetable, timetableEvent) => {
    return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Timetable Update Notification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              padding: 20px;
          }
          .container {
              background-color: #ffffff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
              color: #333333;
          }
          p {
              font-size: 16px;
              color: #555555;
          }
          a {
              color: #007bff;
              text-decoration: none;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Timetable Update Notification for ${student.userid.firstname} ${student.userid.lastname}</h1>
          <p>Dear ${student.userid.firstname},</p>
          <p>We would like to inform you about the following updates in your timetable:</p>
          <ul>
              <li><strong>Date:</strong> ${timetableEvent.timetableid.year +
        "/" +
        timetableEvent.timetableid.month +
        "/" +
        timetableEvent.timetableid.week}</li>
              <li><strong>Time:</strong> ${timetableEvent.timeid.timeslot}</li>
              <li><strong>Location:</strong> ${timetableEvent.locationid.roomnumber +
        " " +
        timetableEvent.locationid.location}</li>

               <li><strong>Course Name:</strong> ${timetableEvent.timetableid.courseid.coursename}</li>
              <!-- Include timetable event information -->
              <li><strong>Event Day:</strong> ${timetableEvent.dayid.day}</li>
              <li><strong>Event Description:</strong> ${timetableEvent.discription}</li>
          </ul>
          <p>Please review these changes and make any necessary adjustments to your schedule.</p>
          <p>If you have any questions or concerns, feel free to contact us.</p>
          <p>Best regards,</p>
          <p>University Timetable System Team</p>
      </div>
  </body>
  </html>`;
};
const VerificationCodeEmail = (verificationCode) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Reset Password Verification Code</title>
        <style>

            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                padding: 20px;
            }
            .container {
                background-color: #ffffff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333333;
            }
            p {
                font-size: 16px;
                color: #555555;
            }
            a {
                color: #007bff;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Password Reset Verification Code</h1>
            <p>Dear User,</p>
            <p>Your verification code for resetting the password is:</p>
            <p style="font-size: 24px; font-weight: bold;">${verificationCode}</p>
            <p>Please use this verification code to reset your password. This code will expire after a certain period for security reasons.</p>
            <p>If you didn't request this change, please ignore this email or contact us immediately.</p>
            <p>Thank you!</p>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </div>
    </body>
    </html>`;
};
exports.default = {
    UserRegisteredEmail,
    //OrderPlacedEmail,
    VerificationCodeEmail,
    generateTimetableNotificationEmail,
    // DailySummaryEmail,
};
