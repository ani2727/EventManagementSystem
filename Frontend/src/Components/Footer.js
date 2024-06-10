import { FaWhatsapp } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
const Footer = ()=>
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
        <div class="ecell-footer">
        <div class="follow-us">
            <h4>Follow us</h4>
            <ul>
                <li><FaInstagram size={30}/></li>
                <li><FaWhatsapp size={30}/></li>
                <li><FaTwitter size={30}/></li>
            </ul>
        </div>
        <div class="ecell-contactus">
            <h4>Contact Us</h4>
            <ul>
                <li><MdEmail size={30}/></li>
            </ul>
        </div>
        <div class="share-thoughts">
            <h4>Share Your Thoughts</h4>
            <span>Please provide your thoughts on Ecell development and innovation to explore more</span>
            <form ref={form} onSubmit={sendEmail}>
                <textarea name="message" />
                <input type="email" name="user_email" placeholder='Enter your Email' />
                <button type="submit" value="Send">Submit</button>
            </form>
        </div>
        
        <div class="interview-openings">
            <h4>Interview Openings</h4>
            <span>Register here to attend Interview and become a part of E-cell</span>
            <form ref={forms} onSubmit={sendEmails}>
                
                <label>Email</label>
                <input type="email" name="user_email" />
                <label>Phone</label>
                <input type="text" name="user_contact" />                        
                <button type="submit" value="Send" >Send</button>
            </form>
        </div>
    </div>
    )
}


export default Footer;