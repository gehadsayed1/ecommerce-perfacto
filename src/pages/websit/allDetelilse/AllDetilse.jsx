import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Element, scroller } from "react-scroll";
import styles from "./allDetilse.module.css"

export default function AllDetilse() {
    const location = useLocation();

    useEffect(() => {
      if (location.hash) {
        scroller.scrollTo(location.hash.replace("#", ""), {
          duration: 100,
          delay: 0,
          smooth: "easeInOutQuart",
        });
      }
    }, [location]);
  return (
    <div className=" container">
       <Element name="section1" className={styles.section}>
        <h2>terms & conditions:</h2>
        <p> <strong>WHAT IS THE DELIVERY TIME FOR MY ORDER?</strong><br />

In case of Exchange or refund requests, kindly be aware that shipping fees will be imposed.

Orders will be delivered within 2-6 days on working days .
</p>
<p><strong> WHAT IS THE COST OF DELIVERY?</strong> <br />

FREE SHIPPING FOR ORDERS ABOVE EGP 4000

For any order your delivery is:

DELIVERY PROCESS
Products sold and shipped by Courir

Delivery days        Shipping charges
  From                  To
Home delivery in Cairo and Giza
  2                     3
          70 EGP
Home delivery in Alexandria
  2                3
90 EGP
Home delivery in Suez
  3       4
100 EGP
Home delivery in Near Upper Egypt
   3    6
110 EGP
Home delivery in Near Upper Red Sea
 3      6
130 EGP
Home delivery in Near Sahel
  3   6
130 EGP
Home delivery in Remote
 3     6
130 EGP
</p>
<p><strong> HOW TO CONTACT CUSTOMER SERVICE?</strong><br />


Our customer service is open from 9:30 Am. to 5:30 Pm on working days.

You can contact our customer service by filling in the form on the customer service page and we will get back to you within 24 hours. If you prefer to speak to our team directly, please call [xxxxxxxx ]

WHAT ARE THE PAYMENT OPTIONS AVAILABLE?

On our website, you can pay using  VISA and Cash on Delivery .

WHAT IS THE REFUND & EXCHANGE POLICY?

REFUND

The Customer must request a product return request to our mail on: Perfecto.eg@gmail.com.
 

Refunds are acceptable within a period of 14 days of purchase (as per invoice date).
The courier will contact with you in 2 to 3 working days to pick up the returned item first, after that it must returned back to the store first.
Please note that it may take up to 15 on working days to process your refund after we have received your returned item(s)
All Credit/Debit Card refunds will be credited back to the original payment card used for the transaction
It may take up to 15 days on working days for the amount to reflect in your Credit/Debit Card after refund is processed

The product must be in its original packaging and in a sellable condition with relevant tags attached. Goods found to be dirty, stained, damaged, torn or abused will not be entertained for refund

For hygiene reasons, the following products cannot be returned as soon as their packaging has been unsealed: [shoe soles, socks, Swimming Wear and Lingerie cleaning products]

Please note that Shipping fee is not refundable. However, if refund is due to a manufacturing defect or damage of product during the delivery process then the Service and delivery charges are fully refundable. However, Value Added Tax (VAT) on the product will be refunded
</p>




<p> <strong>EXCHANGE</strong><br />

Exchanges are acceptable within a period of 14 days of purchase (as per invoice date)
The courier will contact with you in 2 to 3 working days to pick up the returned item first, after that it must returned back to the store first.
The exchanged item will be out for delivery after we received the returned item in 3 working days to deliver as per delivery time for each area.
Exchange product value should be equal or higher than the original purchase
The product must be in its original packaging and in a sellable condition with relevant tags attached. Goods found to be dirty, stained, damaged, torn or abused will not be entertained for exchange
Please note that only ONE TIME EXCHANGE of product is allowed within 14 days of purchase (as per invoice date)
For hygiene reasons, the following products cannot be returned as soon as their packaging has been unsealed: [shoe soles, socks, Swimming Wear and Lingerie cleaning products]

Any exchange process has shipping fees as per shipping charges for each area.
</p>


<p>
COMPANY RIGHTS

Please note, perfecto reserves the right to refuse refunds and/or exchanges on items that are:

-unfit for resale
-exchange made outside of the 14-day time frame
-refund made outside of the 14-day time frame
-refund and exchange request without sales receipt.

The User must follow the process: choose items to return, select a return method, choose a refund method and create a return slipe.
</p>
<p>
<strong>HOW TO RETURN OR EXCHANGE YOUR ORDER?</strong><br />

Step 1: Make sure you have read the refund & exchange policy. 

Is the product in its original condition? 
Do you have the original receipt? 
Are you making the claim within the given time period? 
Please double check if you meet the requirements. 

Step 2: Email us at Perfecto.eg@gmail.comor give us a call at [ 01096810423 ]
</p>

      </Element>
      <Element name="section2" className={styles.section2}>
        <hr/>
        <h2>FAQ:</h2>
        <p><strong>-Is my personal information kept private ?</strong><br/>

Please be assured that we take data protection seriously, and your information will only be shared with third parties where they abide by applicable data protection legislation.

 - Can I cancel my order ?

If your order is still within its fulfillment phase (usually the same day), you can contact our customer Service team to submit your cancellation request.



What payment methods does Courir accept, and is it safe to use my credit card online ?

We accept Visa, MasterCard. You can also choose cash on delivery. All payments are processed through a secure checkout system.
 

 
Are is this products Original?

All the products/brands we sell are 100% Original, and we are the original agent for these Brands.


Which destinations does Courir ship to ?

We deliver all over Egypt now !


How long does delivery take ?

The delivery process takes in working days.</p>
      </Element>
      <Element name="section3" className={styles.section3}>
      <hr/>
        <h2>SHIPPING POLICY:</h2>
        <p><strong>Order Processing Times:</strong><br/>

Orders are typically processed within 3-5 working days inside Cairo, and within 5-7 working days outside Cairo.

Tracking Your Order

Once your order is shipped, you will receive a shipping confirmation email with tracking information.

Delivery

In order for items to be delivered, you’ll receive a phone call from the shipping company to arrange the most convenient time for delivery. You’ll be contacted after the confirmation mail has been sent.

Damages and Lost Packages

If you receive a damaged package, please contact us immediately. We will work with you to resolve the issue as quickly as possible.

Lost packages are rare, but they do happen. If you have not received your package within the estimated delivery window, please contact us. We will investigate the matter and work with you to resolve it.</p>
      </Element>
      <Element name="section4" className={styles.section3}>
        <hr/>
        <h2>SHIPPING POLICY:</h2>
        <p><strong>Order Processing Times</strong><br/>
Orders are typically processed within 3-5 working days inside Cairo, and within 5-7 working days outside Cairo.

Tracking Your Order

Once your order is shipped, you will receive a shipping confirmation email with tracking information.

Delivery

In order for items to be delivered, you’ll receive a phone call from the shipping company to arrange the most convenient time for delivery. You’ll be contacted after the confirmation mail has been sent.

Damages and Lost Packages

If you receive a damaged package, please contact us immediately. We will work with you to resolve the issue as quickly as possible.

Lost packages are rare, but they do happen. If you have not received your package within the estimated delivery window, please contact us. We will investigate the matter and work with you to resolve it.</p>
      </Element>
      <Element name="section5" className={styles.section3}>
        <hr />
        <h2>RETURN & EXCHANGE POLICY:</h2><br/>
        <p>Contact us within 14 days of the delivery date to request a return or exchange.
Package the item securely in its original packaging, if possible.
Include the original copy of your receipt in the package.
You will receive a full refund or exchange (minus shipping costs).
 

Steps of an exchange request:
We will send you a courier in 48 hours to receive the item.
Once the item reaches the store in 2 working days.
The replaced item will be sent to you in 2-3 working days.
 

Steps of a refund request:
We will send you a courier in 48 hours to receive the item.
Once the item reaches the store, the refund amount will be refunded back to your bank account in 7 to 14 working days.
In order to do that, your bank account details are required.</p>
      </Element>
      <Element name="section6" className={styles.section3}>
        <h2>DEFECT POLICY:</h2>
        <p>
            If there’s a manufactural defect within 30 days of receiving the order, exchanges are available if accepted from the quality control

<br/>
            <strong>Promotions Policy:</strong><br/>
        Ex:  Buy ‘X’ Get ‘Y’)

Promotions 

During the promotion period, only exchanges are available.
Items can be exchanged within 14 days of receiving the order.
Exchanges are available only if it’s accepted by the QC (Quality control ) department and the product is in its original condition.
        </p>
      </Element>
    </div>
  )
}
