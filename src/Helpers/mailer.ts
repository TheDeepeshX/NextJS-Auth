import nodemailer from 'nodemailer';
import User from "@/models/userModule";
import bcryptjs from 'bcryptjs'

export const sendEmail=async({email,emailtype,userID}:any)=>{
    try{
        const hashedTokken = await bcryptjs.hash(userID.toString(),10)
        if(emailtype ==="VERIFY")
        {  
           const updateUser = await User.findByIdAndUpdate(userID,{
            $set:{ 
                 verifyToken:hashedTokken,
                 verifyTokenExpiry:new Date(Date.now()+3600000)//expiry in 1 houurs
                }
           })
        }
        else if(emailtype ==='RESET')
        {  await User.findByIdAndUpdate(userID,
          {$set:
          {forgotPasswordToken:hashedTokken,
           forgotPasswordTokenExpiry:new Date(Date.now()+3600000)//expiry in 1 houurs
          }})
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
            /verifyemail?token=${hashedTokken}">here</a> to ${emailtype === "VERIFY" ? "verify your email" :
           "reset your password"}
            or copy and paste the link below in your browser.
            <br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedTokken}
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