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

//   const receiverEmail = "calin.cotuna@emanuel.ro";
//   const messageRefForReceiver = ref(db, `emails/${receiverEmail.replace(/\./g, '_').replace('@', '-')}`);

//   const fakeEmails = [
//     { sender: "no-reply@netflix.com", subject: "Netflix Subscription Reminder: Action Required", content: "Your Netflix subscription needs updating. Click here to secure your access to unlimited streaming. If your payment is not processed in the next 48 hours, your access will be temporarily suspended. Don't miss out on your favorite shows!" },
//     { sender: "info@disneyplus.com", subject: "Exclusive New Releases on Disney+ This Month", content: "Check out the latest movies and series available now on Disney+. From thrilling blockbusters to heartwarming family films, we’ve got something for everyone. Enjoy unlimited streaming on all your devices!" },
//     { sender: "security@paypal.com", subject: "Unusual Login Activity Detected on Your PayPal Account", content: "We noticed a login attempt from a new device in an unfamiliar location. Please verify it was you. If you did not attempt this login, immediately change your password and review your account activity to secure your funds." },
//     { sender: "news@amazon.com", subject: "Special Deals Just for You: Limited Time Offers!", content: "Shop exclusive discounts on items tailored to your preferences on Amazon. From electronics to fashion, find everything you need at unbeatable prices. Hurry, these offers are only available for a limited time!" },
//     { sender: "support@spotify.com", subject: "Your Spotify Premium Plan Needs Your Attention", content: "Your payment for Spotify Premium failed. Update your payment details to continue enjoying music ad-free and with higher sound quality. Enjoy access to millions of songs, podcasts, and playlists without interruption." },
//     { sender: "updates@linkedin.com", subject: "You Have 5 New Connection Requests on LinkedIn", content: "Expand your professional network by accepting new connection requests today. Engage with other professionals, share your expertise, and discover new career opportunities. Don't miss out on potential collaborations!" },
//     { sender: "alerts@bankofamerica.com", subject: "Important: Unusual Transaction Alert on Your Account", content: "We detected an unusual transaction on your account. Please review it immediately to ensure your funds are secure. If this wasn’t you, please contact our support team right away for assistance." },
//     { sender: "offers@udemy.com", subject: "Top Courses for You: Enroll Now for $9.99", content: "Upgrade your skills with our most popular courses at a special price. From coding to marketing, our expert instructors will help you advance your career. This exclusive offer is valid for a limited time only, so sign up today!" },
//     { sender: "marketing@nike.com", subject: "Shop the Latest Nike Collection Now", content: "Discover the newest gear from Nike. Available now online and in-store. Whether you're a runner, a gym-goer, or a casual sneakerhead, we’ve got the perfect fit for you. Free shipping on orders over $50!" },
//     { sender: "updates@github.com", subject: "Your Repository Has New Updates", content: "Your watched repository has new commits. Check out the latest changes and improvements made by contributors. Don’t forget to leave feedback or suggest enhancements on the pull request page." },
//     { sender: "security@apple.com", subject: "Suspicious Sign-In Attempt on Your Apple ID", content: "We noticed a sign-in attempt to your Apple ID from an unrecognized device. Please review your account security settings immediately. If you did not sign in, reset your password and enable two-factor authentication." },
//     { sender: "newsletter@tesla.com", subject: "Exciting News: Tesla's Latest Model is Here", content: "Discover the future of electric vehicles with the all-new Tesla Model X. Featuring cutting-edge technology, enhanced safety features, and an extended range, this model is designed to make every journey extraordinary. Reserve yours today!" },
//     { sender: "info@hulu.com", subject: "New Series You Can’t Miss This Week on Hulu", content: "Stream the latest and greatest shows, exclusively on Hulu. With brand-new series like 'The Haunting' and 'Hidden Truths,' there’s something for every taste. Start watching now and enjoy 30 days free!" },
//     { sender: "alerts@facebook.com", subject: "Your Account Was Accessed from a New Location", content: "We detected a login from a new location. If this wasn’t you, please secure your account immediately. Change your password and review your recent activity to ensure your account is safe." },
//     { sender: "support@zoom.us", subject: "Your Scheduled Meeting is About to Start", content: "Don't forget, your Zoom meeting starts in 10 minutes. Click here to join now and make sure your audio and video settings are working properly before the meeting begins." },
//     { sender: "offers@adidas.com", subject: "Exclusive 30% Off on New Arrivals at Adidas", content: "Shop the latest collection and enjoy a 30% discount for a limited time. Don’t miss out on the latest trends in sportswear and footwear. Free returns on all orders!" },
//     { sender: "promotions@airbnb.com", subject: "Book Your Dream Getaway with Airbnb's Latest Offers", content: "Explore unique stays and save on your next trip with special discounts. From cozy cabins to luxury villas, find the perfect place for your next vacation. Book now and enjoy an exclusive offer just for you!" },
//     { sender: "info@twitch.tv", subject: "Live Now: Your Favorite Streamer Just Went Online", content: "Catch all the action live now. Join the stream and engage with the community! Don't forget to follow your favorite creators to get notified when they go live." },
//     { sender: "sales@playstation.com", subject: "PlayStation Store: Limited-Time Discounts on Top Games", content: "Don't miss out on these great deals. Save big on your favorite games today! From action-packed adventures to sports simulations, there's something for every gamer. Hurry, these offers end soon!" },
//     { sender: "updates@microsoft.com", subject: "Your Microsoft Account Needs Verification", content: "We’ve noticed a sign-in attempt from a new device. Verify it was you to avoid disruptions. If you didn’t initiate this attempt, please change your password and review your security settings immediately." },
//     { sender: "offers@booking.com", subject: "Flash Sale: Book Your Next Adventure at Unbeatable Prices", content: "Find the best deals on hotels, flights, and more. Book now and save big on your next trip. Don’t wait—this flash sale is only available for the next 48 hours!" },
//     { sender: "alerts@walmart.com", subject: "Your Recent Order Has Shipped", content: "Track your order and see its estimated delivery date. Thank you for shopping with Walmart! You’ll receive a notification once your package is out for delivery." },
//     { sender: "support@github.com", subject: "New Pull Request Awaiting Your Review", content: "A collaborator has opened a pull request. Review and merge changes now! Make sure to test the new features and leave your feedback before approving the request." },
//     { sender: "alerts@google.com", subject: "Critical Security Alert: Review Your Account Activity", content: "Your Google account may be at risk. Secure your account by following these steps. It’s important to review your recent activity to ensure your personal information is protected." },
//     { sender: "support@slack.com", subject: "You Have Unread Messages in Your Workspace", content: "Collaborate better by catching up on unread messages. Log in to stay updated and stay on top of all your projects and conversations!" },
//     { sender: "events@meetup.com", subject: "New Events Happening Near You This Week", content: "Join exciting events in your area and meet like-minded people. RSVP now and don’t miss out on networking opportunities in your community!" },
//     { sender: "marketing@canon.com", subject: "Capture the Moment: New Cameras and Accessories Available", content: "Explore our latest collection of cameras and find the perfect gear for your next shoot. Whether you're a professional or a beginner, Canon has the equipment you need to bring your vision to life." },
//     { sender: "info@coursera.org", subject: "Boost Your Skills: Enroll in a New Course Today", content: "Explore a wide range of courses and earn certifications from top universities. Whether you're looking to learn coding, marketing, or data science, there's something for everyone. Start learning today!" },
//     { sender: "news@time.com", subject: "Breaking News: Major Stories from Around the World", content: "Stay informed with the latest updates and in-depth analysis from TIME. From political developments to cultural shifts, read the most important stories that are shaping the world." },
//     { sender: "updates@uber.com", subject: "Your Ride Receipt: See the Details of Your Last Trip", content: "Thank you for riding with Uber. Here’s your receipt and trip summary. If you have any questions about your ride, don’t hesitate to contact our support team for assistance." },
//     { sender: "support@etsy.com", subject: "Your Etsy Order Has Been Shipped", content: "Your order from our shop has been shipped and is on its way! Track your shipment here and get ready to enjoy your handmade items. Thank you for supporting independent sellers on Etsy!" },
//     { sender: "news@bbc.com", subject: "Breaking News: Global Events You Should Know", content: "Stay updated with the most recent global news. From political shifts to scientific breakthroughs, BBC covers the most impactful stories. Stay informed with our comprehensive articles and analyses." },
//     { sender: "offers@bestbuy.com", subject: "Flash Sale on Electronics – Save Up to 50% Off!", content: "The Best Buy flash sale is live! Save big on top-rated electronics, from smart TVs to laptops and home appliances. Hurry, these deals won’t last long. Shop now and get the best prices of the season!" },
//     { sender: "info@aircanada.com", subject: "Your Flight Booking Confirmation", content: "Your flight with Air Canada is confirmed. Your itinerary includes all the details about your departure, baggage allowance, and check-in instructions. We look forward to having you on board!" },
//     { sender: "help@zoominfo.com", subject: "Your ZoomInfo Account Has Been Updated", content: "Your ZoomInfo account has been successfully updated. You now have access to enhanced features including unlimited searches and additional data insights. Explore the new tools designed to improve your sales and marketing efforts." },
//     { sender: "support@slack.com", subject: "New Messages Await Your Review on Slack", content: "You have new messages in your workspace on Slack. Catch up on the latest discussions, action items, and updates. Don’t miss out on any important notifications, and stay in the loop with your team!" },
//     { sender: "alerts@fedex.com", subject: "Your FedEx Package is Out for Delivery", content: "Good news! Your FedEx package is out for delivery today. Track its real-time location and ensure someone is available to receive the package. Thank you for using FedEx, we strive to deliver your items on time." },
//     { sender: "security@microsoft.com", subject: "Suspicious Activity Detected on Your Microsoft Account", content: "We’ve noticed some suspicious activity on your Microsoft account. To protect your personal information, please sign in to verify recent actions and secure your account immediately." },
//     { sender: "alerts@verizon.com", subject: "Your Verizon Bill is Ready to View", content: "Your Verizon bill is now available. Review your latest charges and payments in your account. If you have any questions or need assistance, our customer service team is ready to help." },
//     { sender: "events@ticketmaster.com", subject: "Upcoming Concerts Near You: Buy Your Tickets Today", content: "Don’t miss out on your favorite bands and events. Buy your tickets for upcoming concerts and shows now through Ticketmaster. From rock to classical music, there’s something for everyone. Get your tickets before they sell out!" },
//     { sender: "alerts@adobe.com", subject: "Your Adobe Subscription Has Been Renewed", content: "Your Adobe Creative Cloud subscription has been successfully renewed. Enjoy continued access to Photoshop, Illustrator, and other creative tools. If you’d like to make changes to your plan, visit your account settings." },
//     { sender: "help@spotify.com", subject: "Your Spotify Account Needs Verification", content: "We noticed a change to your Spotify account. Please verify your information to continue enjoying uninterrupted music streaming. If this wasn’t you, reset your password immediately to protect your account." },
//     { sender: "support@paypal.com", subject: "Your PayPal Payment Was Successful", content: "We’ve successfully processed your recent payment. You can view the details of the transaction in your PayPal account. If you didn’t authorize this payment, please contact PayPal support immediately." },
//     { sender: "alerts@ebay.com", subject: "Your eBay Auction is About to End", content: "Your eBay auction is about to end in 12 hours! Make sure to check on your listing to see the current bid and keep an eye on your competitors. Don’t miss out on the opportunity to win the auction!" },
//     { sender: "info@instacart.com", subject: "Your Instacart Order Has Been Delivered", content: "Your grocery order from Instacart has been successfully delivered. Check your doorstep for your fresh produce and essentials. If there’s an issue with your order, please contact customer support." },
//     { sender: "support@airbnb.com", subject: "Your Upcoming Stay at Airbnb", content: "Your upcoming stay at a beautiful Airbnb property is almost here! View your itinerary, check-in details, and communication with your host in the Airbnb app. We hope you enjoy your vacation!" },
//     { sender: "alerts@homeDepot.com", subject: "Exclusive Offers on Home Improvement Products", content: "Transform your home with special offers on tools, appliances, and building materials from Home Depot. Shop now to save on everything from DIY essentials to professional-grade equipment." },
//     { sender: "promotions@nike.com", subject: "Flash Sale on Nike Sneakers – Limited Time Only", content: "Get your hands on the latest Nike sneakers during our flash sale! From running shoes to casual wear, enjoy discounts up to 40%. Don’t wait, this sale ends soon!" },
//     { sender: "support@uber.com", subject: "Uber Ride: Your Trip Summary", content: "Here’s a summary of your Uber trip. View your route, driver’s name, and total fare. Thank you for choosing Uber for your transportation needs. Rate your driver and leave feedback to help us improve." },
//     { sender: "marketing@spotify.com", subject: "Discover New Music with Spotify Playlists", content: "Looking for new music? Check out Spotify’s curated playlists featuring the latest hits and hidden gems. Follow your favorite artists and never miss a beat. Start listening now!" },
//     { sender: "alerts@wellsfargo.com", subject: "Important Notice: Wells Fargo Account Changes", content: "We’ve made some important updates to your Wells Fargo account. Please review your account details to ensure everything is correct. If you need help, contact our support team." },
//     { sender: "news@cnn.com", subject: "Latest Updates: World News at Your Fingertips", content: "Get the latest breaking news from around the world. From political developments to natural disasters, CNN provides real-time updates on important events. Stay informed on the go with our mobile app." }

//   ];


//   for (let i = 0; i < fakeEmails.length; i++) {
//     const email = fakeEmails[i];
//     const timestamp = Date.now();

//     const emailData = {
//       senderEmail: email.sender,
//       senderId: `fake-user-${i + 1}`,
//       receiverEmail: receiverEmail,
//       message: email.content,
//       timestamp: timestamp,
//       subject: email.subject,
//       signedBy: email.sender.split('@')[1],
//       read: false,
//       checked: false,
//       star: false,
//       important: false,
//       archived: false,
//       deleted: false,
//       sentByMe: false,
//     };

//     const newMessageRefReceiver = push(messageRefForReceiver);
//     await set(newMessageRefReceiver, emailData);
//   }

//   alert('30 de mesaje personalizate au fost trimise cu succes!');
// };
