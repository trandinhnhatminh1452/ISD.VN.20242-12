import java.util.ArrayList;

import javax.management.Notification;

public class UserNotification {
    private list<String> emailRecipients = new ArrayList<>();
    private List<String> smsRecipients = new ArrayList<>();

    public void sendNotification(User user, String message, NotificationType type) {
       switch (type) {
        case 0:
            sendEmail(user.getEmail(), message);
            break;
        case 1:
            sendSMS(user.getPhoneNumber(), message);
            break;
        case 2:
            sendPushNotification(user.getDeviceToken(), message);
            break;
        default:
            throw new IllegalArgumentException("Invalid notification type");
        }
       }

       private void sendEmail(String email, String message) {
           // Logic to send email
           System.out.println("Sending email to " + email + ": " + message);
       }

       private void sendSMS(String phoneNumber, String message) {
           // Logic to send SMS
          try {
            //Giả định sử dụng Twilio
               String accountSid = "your_account_sid";
               String authToken = "your_auth_token";

            //Xử lý gửi SMS với Twilio
           } catch (Exception e) {
               System.err.println("Failed to send SMS: " + e.getMessage());
           }
       }
    }

