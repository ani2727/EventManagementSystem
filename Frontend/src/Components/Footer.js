
import { FaInstagram,FaLinkedin } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { useRef} from 'react';
import emailjs from '@emailjs/browser';

const Footer = ({clubData})=>
{

    const form = useRef();
    const forms = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs
          .sendForm('service_nmfnxej', 'template_mdb3nra', form.current, {
            publicKey: 'SP7Vld6f5wytgRVLm',
          })
          .then(
            () => {
              alert('SUCCESS!');
              e.target.reset();
            },
            (error) => {
             alert('FAILED...', error.text);
            },
          );
      };

      const sendEmails = (e) => {
        e.preventDefault();
    
        emailjs
          .sendForm('service_nmfnxej', 'template_mdb3nra', forms.current, {
            publicKey: 'SP7Vld6f5wytgRVLm',
          })
          .then(
            () => {
              alert('SUCCESS!');
              e.target.reset();
            },
            (error) => {
             alert('FAILED...', error.text);
            },
          );
      };


    return (
        <div className="ecell-footer">
        <div className="follow-us">
            <h4>Follow us</h4>
            <ul>
                <li><a href={`${clubData.clubInsta}`} target='__blank'><FaInstagram className='icon' size={30}/></a></li>
                <li><a href={`${clubData.clubFacebook}`} target='__blank'><FaLinkedin className='icon' size={30}/></a></li>
            </ul>
        </div>
        <div className="ecell-contactus">
            <h4>Contact Us</h4>
            <ul>
              <li><a href={`mailto:${clubData.clubMail}`} ><MdEmail className='icon' size={30}/></a></li>
            </ul>
        </div>
        <div className="share-thoughts">
            <h4>Share Your Thoughts</h4>
            <span>Please provide your thoughts on {clubData.clubName} development and innovation to explore more</span>
            <form ref={form} onSubmit={sendEmail}>
                <textarea name="message" type="text" placeholder='Message' />
                <input type="email" name="user_email" placeholder='Enter your Email' />
                <button type="submit" value="Send">Submit</button>
            </form>
        </div>
        <div>
            {clubData.interview && (
                <div className="interview-openings">
                    <h4 className="highlight">Interview Openings</h4>
                    <span>Register here to attend Interview and become a part of {clubData.clubName}</span>
                    <p>Eligible Students:{clubData.interviewFor}</p>
                    <form ref={forms} onSubmit={sendEmails}>
                        <input type="email" name="user_email" placeholder='Email' />
                        <input type="text" name="user_contact" placeholder='Mobile No' />                        
                        <button type="submit" value="Send">Send</button>
                    </form>
                </div>
            )}
        </div>
    </div>
    )
}


export default Footer;