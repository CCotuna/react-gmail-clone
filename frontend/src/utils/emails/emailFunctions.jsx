// import { set, push} when using saveMultipleEmails function
import { getDatabase, ref, update, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import app from '../../firebase/firebaseConfig';

export const toggleEmailField = async (id, field, currentState, setEmails, emails) => {
  const updatedEmails = emails.map((email) =>
    email.id === id ? { ...email, [field]: !currentState } : email
  );
  setEmails(updatedEmails);

  const db = getDatabase(app);
  const auth = getAuth();
  const email = auth.currentUser?.email;
  const formattedEmail = email.replace(/\./g, '_').replace('@', '-');
  const emailRef = ref(db, `emails/${formattedEmail}/${id}`);

  update(emailRef, { [field]: !currentState });
};

export const permanentlyDeleteEmail = async (id, setEmails, emails) => {
  try {
    const updatedEmails = emails.filter((email) => email.id !== id);
    setEmails(updatedEmails);

    const db = getDatabase(app);
    const auth = getAuth();
    const email = auth.currentUser?.email;

    if (!email) {
      throw new Error('User not authenticated.');
    }

    const formattedEmail = email.replace(/\./g, '_').replace('@', '-');
    const emailRef = ref(db, `emails/${formattedEmail}/${id}`);

    await remove(emailRef);

    console.log(`Email with ID: ${id} has been permanently deleted.`);
  } catch (error) {
    console.error('Error deleting email:', error);
  }
};

// export const saveMultipleEmails = async () => {
//   const db = getDatabase(app);

//   const receiverEmail = "test@gmail.com";
//   const messageRefForReceiver = ref(db, `emails/${receiverEmail.replace(/\./g, '_').replace('@', '-')}`);

//   const fakeEmails = [
//     { sender: "no-reply@netflix.com", subject: "Netflix Subscription Reminder: Action Required", content: "Your Netflix subscription needs updating. Click here to secure your access to unlimited streaming." },
//     { sender: "info@disneyplus.com", subject: "Exclusive New Releases on Disney+ This Month", content: "Check out the latest movies and series available now on Disney+!" },
//     { sender: "security@paypal.com", subject: "Unusual Login Activity Detected on Your PayPal Account", content: "We noticed a login attempt from a new device. Please verify it was you." },
//     { sender: "news@amazon.com", subject: "Special Deals Just for You: Limited Time Offers!", content: "Shop exclusive discounts on items tailored to your preferences on Amazon." },
//     { sender: "support@spotify.com", subject: "Your Spotify Premium Plan Needs Your Attention", content: "Your payment for Spotify Premium failed. Update your payment details to continue enjoying music ad-free." },
//     { sender: "updates@linkedin.com", subject: "You Have 5 New Connection Requests on LinkedIn", content: "Expand your professional network by accepting new connection requests today." },
//     { sender: "alerts@bankofamerica.com", subject: "Important: Unusual Transaction Alert on Your Account", content: "We detected an unusual transaction on your account. Please review it immediately." },
//     { sender: "offers@udemy.com", subject: "Top Courses for You: Enroll Now for $9.99", content: "Upgrade your skills with our most popular courses at a special price." },
//     { sender: "marketing@nike.com", subject: "Shop the Latest Nike Collection Now", content: "Discover the newest gear from Nike. Available now online and in-store." },
//     { sender: "updates@github.com", subject: "Your Repository Has New Updates", content: "Your watched repository has new commits. Check out the latest changes." },
//     { sender: "security@apple.com", subject: "Suspicious Sign-In Attempt on Your Apple ID", content: "We noticed a sign-in attempt to your Apple ID from an unrecognized device. Please review your account security." },
//     { sender: "newsletter@tesla.com", subject: "Exciting News: Tesla's Latest Model is Here", content: "Discover the future of electric vehicles with the all-new Tesla Model X. Reserve yours today!" },
//     { sender: "info@hulu.com", subject: "New Series You Can’t Miss This Week on Hulu", content: "Stream the latest and greatest shows, exclusively on Hulu. Start watching now!" },
//     { sender: "alerts@facebook.com", subject: "Your Account Was Accessed from a New Location", content: "We detected a login from a new location. If this wasn’t you, please secure your account immediately." },
//     { sender: "support@zoom.us", subject: "Your Scheduled Meeting is About to Start", content: "Don't forget, your Zoom meeting starts in 10 minutes. Click here to join now!" },
//     { sender: "offers@adidas.com", subject: "Exclusive 30% Off on New Arrivals at Adidas", content: "Shop the latest collection and enjoy a 30% discount for a limited time. Don’t miss out!" },
//     { sender: "promotions@airbnb.com", subject: "Book Your Dream Getaway with Airbnb's Latest Offers", content: "Explore unique stays and save on your next trip with special discounts." },
//     { sender: "info@twitch.tv", subject: "Live Now: Your Favorite Streamer Just Went Online", content: "Catch all the action live now. Join the stream and engage with the community!" },
//     { sender: "sales@playstation.com", subject: "PlayStation Store: Limited-Time Discounts on Top Games", content: "Don't miss out on these great deals. Save big on your favorite games today!" },
//     { sender: "updates@microsoft.com", subject: "Your Microsoft Account Needs Verification", content: "We’ve noticed a sign-in attempt from a new device. Verify it was you to avoid disruptions." },
//     { sender: "offers@booking.com", subject: "Flash Sale: Book Your Next Adventure at Unbeatable Prices", content: "Find the best deals on hotels, flights, and more. Book now and save big!" },
//     { sender: "alerts@walmart.com", subject: "Your Recent Order Has Shipped", content: "Track your order and see its estimated delivery date. Thank you for shopping with Walmart!" },
//     { sender: "support@github.com", subject: "New Pull Request Awaiting Your Review", content: "A collaborator has opened a pull request. Review and merge changes now!" },
//     { sender: "alerts@google.com", subject: "Critical Security Alert: Review Your Account Activity", content: "Your Google account may be at risk. Secure your account by following these steps." },
//     { sender: "support@slack.com", subject: "You Have Unread Messages in Your Workspace", content: "Collaborate better by catching up on unread messages. Log in to stay updated!" },
//     { sender: "events@meetup.com", subject: "New Events Happening Near You This Week", content: "Join exciting events in your area and meet like-minded people. RSVP now!" },
//     { sender: "marketing@canon.com", subject: "Capture the Moment: New Cameras and Accessories Available", content: "Explore our latest collection of cameras and find the perfect gear for your next shoot." },
//     { sender: "info@coursera.org", subject: "Boost Your Skills: Enroll in a New Course Today", content: "Explore a wide range of courses and earn certifications from top universities." },
//     { sender: "news@time.com", subject: "Breaking News: Major Stories from Around the World", content: "Stay informed with the latest updates and in-depth analysis from TIME." },
//     { sender: "updates@uber.com", subject: "Your Ride Receipt: See the Details of Your Last Trip", content: "Thank you for riding with Uber. Here’s your receipt and trip summary." }
// ];

//   for (let i = 0; i < fakeEmails.length; i++) {
//       const email = fakeEmails[i];
//       const timestamp = Date.now();

//       const emailData = {
//           senderEmail: email.sender,
//           senderId: `fake-user-${i + 1}`,
//           receiverEmail: receiverEmail,
//           message: email.content,
//           timestamp: timestamp,
//           subject: email.subject,
//           signedBy: email.sender.split('@')[1],
//           read: false,
//           checked: false,
//           star: false,
//           important: false,
//           archived: false,
//           deleted: false,
//           sentByMe: false,
//       };

//       const newMessageRefReceiver = push(messageRefForReceiver);
//       await set(newMessageRefReceiver, emailData);
//   }

//   alert('30 de mesaje personalizate au fost trimise cu succes!');
// };
