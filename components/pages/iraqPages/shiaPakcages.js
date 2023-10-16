import PackageCard from "@/components/cards/packageCard/packageCard.js"
import background from "../../../public/backgroundImages/iraqZiyaratShia.jpeg"
import background_mb from "../../../public/backgroundImages/iraqZiyaratShia_mb.png"
import ziyarat from "../../../data/shiaZiyarat.js"
import IconLongList from "@/components/lists/iconLongList.js";
import Image from "next/image";
import SingleImage from "@/components/carousel/singleImage";

const ShiaZiyarat = ({iraqPackages , fetchData})=>{
    return(
        <>
        
                <SingleImage url={[background , background_mb]} />
    
            <div className="margin">
                <div className="body-wrapper">
                    {
                        iraqPackages.map((pkg, i) => (
                            <PackageCard fetchData={fetchData} type="iraq" subType="shia" tour={pkg} key={i} />
                        ))
                    }
                </div>
                <h2 className="boldHeading">KARBALA (IRAQ ZIYARAT)</h2>
                <p className="content">Karbala is a significant city in central Iraq, known for its historical and religious importance, particularly within the Islamic faith, specifically for the Shia Muslim community. The city is located about 100 kilometres southwest of the capital city, Baghdad. It holds great significance due to the events associated with the Battle of Karbala, which took place in 680 AD.</p>
                <br></br>
                <p className="content">
                    <strong>1. Battle of Karbala:</strong> The Battle of Karbala is a pivotal event in Islamic history. It occurred during the month of Muharram in the year 680 AD (61 AH) and was a confrontation between the forces of Imam Hussein ibn Ali, the grandson of Prophet Muhammad, and the Umayyad Caliphate&apos;s army led by Yazid I. The battle resulted in the martyrdom of Imam Hussein and his followers. This event is commemorated annually by Shia Muslims during the month of Muharram, especially on the day of Ashura. The battle symbolizes principles such as standing up against injustice, tyranny, and oppression.

                </p>
                <br></br>
                <p className="content"><strong>2. Imam Hussein Shrine:</strong> One of the most prominent landmarks in Karbala is the Imam Hussein Shrine, which is a significant pilgrimage site for Shia Muslims around the world. The shrine is a grand mausoleum that houses the remains of Imam Hussein. Every year, millions of Shia pilgrims visit the shrine to pay their respects and participate in religious rituals. The annual pilgrimage, known as ARBEEN, is one of the largest peaceful gatherings in the world.</p>

                <br></br>
                <p className="content"><strong>3. Religious Significance:</strong> Karbala is considered a holy city for Shia Muslims due to its association with Imam Hussein and his martyrdom. The city&apos;s historical and spiritual importance draws believers who seek to connect with the principles of justice, resistance, and devotion. Karbala&apos;s role in shaping the religious and cultural identity of Shia communities cannot be understated.</p>
                <br></br>
                <p className="content"><strong>4. ABAEEN Pilgrimage:</strong> ARBAEEN is an annual pilgrimage that occurs 40 days after Ashura, marking the end of the mourning period for Imam Hussein&apos;s martyrdom. It is a massive event where millions of pilgrims, often on foot, journey to Karbala from various parts of the world. This pilgrimage reflects the unity, solidarity, and commitment of the Shia community to the values represented by Imam Hussein.</p>
                <br></br>
                <p className="content">Karbala&apos;s historical significance and ongoing role as a centre of religious devotion make it a place of deep reverence for millions of Shia Muslims worldwide.

                </p>

                <h2 className="boldHeading">NAJAF (IRAQ ZIYARAT)</h2>
                <p className="content">Najaf, located in central Iraq, holds immense historical and cultural significance, particularly within the context of Islamic history. Here&apos;s an overview of its history:

                </p>
                <br></br>
                <p className="content"><strong>Ancient History:</strong> Najaf&apos;s history can be traced back to ancient times. It was initially a small agricultural settlement that grew around a natural oasis. The city&apos;s location near the Euphrates River made it a vital hub for trade and agriculture in Mesopotamia.</p>
                <br></br>
                <p className="content"><strong>Islamic History:</strong> Najaf gained prominence due to its connection to Islam and its status as a significant religious centre. The city is renowned for its association with the First imam of Islam, Imam Ali ibn Abi Talib (600-661 AD), who is highly revered by Shia Muslims. Imam Ali&apos;s tomb, located in the city&apos;s heart, is a major pilgrimage site and one of the holiest places for Shia Muslims.

                </p>
                <br></br>
                <p className="content"><strong>Theological Centre:</strong> Najaf has been a centre of Islamic scholarship for centuries. The city&apos;s seminaries have produced many renowned scholars, theologians, and jurists who have contributed significantly to Shia Islamic thought. These institutions attract students from various parts of the world, making Najaf a global hub for Islamic education.</p>
                <br></br>
                <p className="content"><strong>Tourism:</strong> Najaf remains a significant pilgrimage site for Shia Muslims. Millions of pilgrims visit the city annually to pay their respects at the shrine of Imam Ali. The city&apos;s economy is closely tied to religious tourism.

                </p>
                <h2 className="boldHeading">BAGDAD (IRAQ ZIYARAT)
                </h2>
                <p className="content">Baghdad, the capital city of Iraq, has a rich and complex history that spans thousands of years. Here&apos;s a brief overview:</p>
                <br></br>
                <p className="content"><strong>Foundation:</strong> Baghdad was officially founded in the 8th century. In 762 AD, the Abbasid Caliph Al-Mansur chose the location for his new capital and named it Madinat al-Salam which means the City of Peace. This marked the beginning of Baghdad&apos;s significance as a major cultural, political, and economic centre in the Islamic world.</p>
                <br></br>
                <p className="content"><strong>Golden Age:</strong> The Abbasid Caliphate&apos;s rule saw a “Golden Age“ in Baghdad during the 8th to 10th centuries. It became a hub for scholars, philosophers, mathematicians, and artists from diverse backgrounds. The House of Wisdom, an important centre of learning and translation, played a key role in preserving and translating ancient Greek, Persian, and Indian works into Arabic.</p>
                <br></br>
                <p className="content"><strong>Modern Capital:</strong> Baghdad became the capital of the newly established Kingdom of Iraq in 1921. The city continued to experience growth and modernization throughout the 20th century, with significant developments and urban expansion.</p>
                <br></br>
                <p className="content"><strong>Present Day:</strong> In the post-conflict era, Baghdad continues to rebuild and develop. It remains an important cultural and economic hub in the region, but it also faces challenges related to security, political stability, and infrastructure development.</p>
                <br></br>
                <br></br>

                <div className="body-wrapper items-start justify-around">
                    <div style={{width:"48%"}}>
                        <div className="greenBox">
                        <p className="boldHeading center small">Ziyarat</p>
                        </div>
                        <IconLongList items={ziyarat[0]} />
                    </div>
                    <div style={{width:"48%"}}>
                    <div className="greenBox">
                    <p className="boldHeading center small">Ziyarat</p>
                    </div>
                        <IconLongList items={ziyarat[1]} />
                    </div>
                </div>
            </div>
            </>
    )
}

export default ShiaZiyarat;