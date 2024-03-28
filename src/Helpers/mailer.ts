import nodemailer from 'nodemailer';
import User from "@/models/userModule";
import bcryptjs from 'bcryptjs'

export const sendEmail=async({email,emailtype,userID}:any)=>{
    try{
        const hashedTokken = await bcryptjs.hash(userID.toString(),10)
        if(emailtype ==="VERIFY")
        { await User.findByIdAndUpdate(userID,
          {verifyToken:hashedTokken,verifyTokenExpiry:Date.now()+ 360000})
        }
        else if(emailtype ==='RESET')
        {await User.findbyIDandUpdata(userID,
         {forgotPasswordToken:hashedTokken,forgotPasswordTokenExpiry:Date.now()+ 360000})
        }
        else{

        }

        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "8651cdc9691dc5",//❌ hot show in public config in .env
            pass: "927ed1f8659524"//❌ hot show in public config in .env
          }
        });
          
          const mailOptions={
            from:'Deepesh@Dev.in',
            to:email,
            subject: emailtype==='VERIFY' ? "verify four email " : "Reset your passsword",
            // text:'',
            html:`<p>Click <a href="${process.env.DOMAIN}
            /varifyemail?token=${hashedTokken}">here</a> to ${emailtype === "VERIFY" ? "verify your email" :
           "reset your password"}
            or copy and paste the link below in your browser.
            <br>
            ${process.env.DOMAIN}
            /varifyemail?token=${hashedTokken}
           </p>`,
          }
          const mailResponce = await transport.sendMail(mailOptions)
          return mailResponce;
    }
    catch(e:any)
    {
      throw new Error(e.message)
    }
}