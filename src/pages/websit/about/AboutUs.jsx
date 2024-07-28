import styles from "./aboutus.module.css";
import imgAbout from "../../websit/imgWed/417433848_693187839691350_4451161736274379705_n.jpg"

export default function AboutUs() {
  return (
    <div className={` container mt-5 ${styles.abut}  `}>
      <h2 className=" mb-5" >About Us</h2>
      <div className="row">
        <div className=" col-12 mb-3 col-md-12 col-lg-6">
        <img className=" w-100 mb-3 " src={imgAbout} alt="imgAbout" />
        </div>
      <div className=" col-12">
        
        <p>
          We are an emerging Egyptian clothing company, under the name<strong>Perfecto</strong> 
          Company, We have several new ideas in different areas of Cairo,
          anywhere within the service range of its different teams. The company
          was registered on the Badr Shibli national website in 2022, and it
          specializes in analyzing women’s clothing with high quality at
          reasonable prices.</p>
          <p><strong>Perfecto</strong>  is distinguished by providing its
          products with a quality superior to the largest international brands
          in the field of clothing, while preserving the local character of the
          Egyptian industry.
          The spread of the company's branches in multiple
          areas of Cairo, including Abbas El Akkad, Heliopolis, Faisal, Helwan,
          and Giza, reflects its commitment to meeting customers' needs in a
          convenient and convenient manner.</p>
          <p> <strong>Perfecto</strong>  is currently working on
          opening new branches, and the sixth branch will be opened in the Qasr
          El Nil area in the center of the country Perfecto reflects its
          commitment to providing the best services and products to its
          customers, and looks forward to continued growth and expansion in the
          Egyptian and global market in the near future.
        </p>
      </div>
      </div>
      
    </div>
  );
}
