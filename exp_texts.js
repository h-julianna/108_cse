const experiment_text = {"hun":{
	"downprobe":"le",
	"upprobe": "fel",
	"leftprobe": "bal",
	"rightprobe":"jobb",
	"downprime":"le<br>le<br>le",
	"upprime":"fel<br>fel<br>fel",
	"leftprime":"bal<br>bal<br>bal",
	"rightprime":"jobb<br>jobb<br>jobb",
    "welcome":`<img src="images/University_logo.png" alt="images/University Logo" style="width: 300px; display: block; margin: auto;">
            	<h2>Üdvözlünk a Metatudomány kutatócsoport vizsgálatában!</h2>
                <p>Egy tudományos kutatásban veszel részt, amelynek vezetője Bognár Miklós, az ELTE Affektív Pszichológia Tanszékének kutatója. 
                A kutatás célja megvizsgálni, hogy különböző ingertípusok miként hatnak a reakcióidőre.</p>
              <h3>Részvétel</h3>
                <p>A kutatásban való részvétel teljesen önkéntes. A vizsgálatot bármikor indoklás nélkül megszakíthatod. 
                Ha bármilyen kérdésed, észrevételed vagy problémád van a kutatással kapcsolatban, írj Bognár Miklósnak a <a href="mailto:bognar.miklos@ppk.elte.hu">bognar.miklos@ppk.elte.hu</a> címre.</p>`,
	"button_press":`Tovább`,
	"yes/no": ["Igen", "Nem"],
	"finish":`Vége`,
	"fullscreen":`<p>A kísérlet teljes képernyős módra vált.</p>`,
	"informed_consent":`<h2>Beleegyező nyilatkozat</h2>
                <p>Felelősségem teljes tudatában kijelentem, hogy a mai napon az Eötvös Loránd Tudományegyetem, Bognár Miklós kutatásvezető által végzett vizsgálatban</p>
                 <ul>
                    <li>önként veszek részt.</li>
                    <li>a vizsgálat jellegéről, annak megkezdése előtt kielégítő tájékoztatást kaptam.</li>
                    <li>nem szenvedek semmilyen pszichiátriai betegségben.</li>
                    <li>a vizsgálat idején alkohol vagy drogok hatása alatt nem állok.</li>
                 </ul>
                <p>Tudomásul veszem, hogy az azonosításomra alkalmas személyi adataimat bizalmasan kezelik.
                    Hozzájárulok ahhoz, hogy a vizsgálat során a rólam felvett, személyem azonosítására nem alkalmas adatok más kutatók számára is hozzáférhetők legyenek.
                    Fenntartom a jogot arra, hogy a vizsgálat során annak folytatásától bármikor elállhassak. 
                    Ilyen esetben a rólam addig felvett adatokat törölni kell.</p>
                <p>Tudomásul veszem, hogy csak a teljesen befejezett kitöltésért kapok pontot a <em>Pszichológiai kísérletben és tudományos aktivitásban való részvétel</em> nevű kurzuson.</p>
                <p><strong>A kutatásban való részvételem körülményeiről részletes tájékoztatást kaptam, a feltételekkel egyetértek. 
                    Amennyiben egyetértesz a fenti feltételekkel, kattints az "Igen" gombra.</strong></p>`,
	"data_handling":`<h2 style="text-align: center;">Adatkezelési tájékoztató</h2>
            	<p style="text-align: justify; max-width: 800px; margin: auto;">Szigorúan bizalmasan kezelünk minden olyan személyes információt, amit a kutatás keretén belül gyűjtünk össze. 
                A kutatás során nyert adatokat kóddal ellátva biztonságos számítógépeken tároljuk. A kutatás során nyert adatokat összegezzük. 
                Az ELTE PPK Affektív Pszichológia Tanszék Metatudomány Kutatócsoportja, mint adatkezelő, fenti személyes adataidat bizalmasan kezeli, más adatkezelőnek, adatfeldolgozónak nem adja át.
                E tényállás részleteit a <a href="http://metasciencelab.elte.hu/hozzajarulas-adatkezeleshez/" target=_blank">"Hozzájárulás adatkezeléshez"</a> c. dokumentum tartalmazza.</p>

            	<p>Az adatkezelésről szóló szabályzásról részletesebben pedig itt tájékozódhatsz:
                <a href="https://ppk.elte.hu/file/Hozzajarulas_adatkezeleshez_melleklet_2018.pdf" target="_blank">Hozzájárulás adatkezeléshez melléklet</a></p>
            	<p>A kutatás során nyert személyes adataidat arra használjuk fel, hogy regisztrálhassuk a részvételért járó kurzuspontokat. 
            	Az azonosítására alkalmas adatokat (NEPTUN kód) ezután törölni fogjuk. A kezelt adatok a következők:</p>
                <ul>
                    <li>Életkor</li>
                    <li>NEPTUN-kód</li>
                    <li>Nem</li>
                </ul>
            	<p>Válaszaid nem lesznek semmilyen módon hozzád köthetők. Az anonimizált adataidat más kutatókkal megosztjuk.</p>
            	<p><strong>Kérlek, amennyiben egyetértesz a fenti feltételekkel, és hozzájárulsz a kutatásban való részvételhez, kattints az "Igen" gombra.</strong></p>`,
	"age":`Hány éves vagy?`,
	"neptun":`Mi a NEPTUN kódod?`,
	"gender":`Melyik nemmel azonosulsz?`,
	"gender_options":["Férfi", "Nő", "Nem-bináris", "Nem szeretném megosztani"],
	"instruction_exp1":`<h2>Instrukciók</h2>
                <p>Ebben a kísérletben arra vagyunk kíváncsiak, hogy miként befolyásolja a büntetés és a jutalmazás a konfliktusfeldolgozást. 
                A kísérlet során iránymegjelöléseket fogsz olvasni (FEL, LE, JOBB, BAL). Először egy prime inger fog megjelenni a képernyőn, amin egy irány (pl.: „FEL”) lesz olvasható egymás alatt háromszor. 
                Ezt követően megjelenik a célinger, ami vagy azonos („FEL”) vagy ellentétes („LE”) lesz az előtte bemutatott iránnyal.
                A feladatod az lesz, hogy minél gyorsabban és pontosabban eltaláld a célinger irányát a hozzárendelt billentyű megnyomásával.</p> 
                <p>A kísérletet 2000 garassal kezded. Amikor a célinger <span style="color: #FF3B3B; font-weight: bold;">piros</span> színű, akkor 17 garast vonunk le tőled.
                Ha viszont <span style="color: #00E676; font-weight: bold;">zöld</span> színű célingert látsz, 17 garas a jutalmad. 
                A neutrális próbákat három szín fogja jelölni: <span style="color: #2979FF; font-weight: bold;">kék</span>, <span style="color: #FFD700; font-weight: bold;">sárga</span> és <span style="color: #E040FB; font-weight: bold;">rózsaszín</span>. Ezeknél a próbáknál sem jutalom, sem büntetés nem jár.</p> 
								<p>Minden blokk végén látni fogod, mennyi garassal rendelkezel. Az utolsó blokk végén a kísérletért járó pontszám az eredményedtől függ: 1800 garas alatt 2,5 pont, 2200 garas felett 3,5 pont, a kettő között pedig a kiinduló 3 pont marad. </p>
                <p>Kérlek helyezd a billentyűzetre a kezedet a képen látható módon:</p>
                <p>A bal gyűrűsujjadat tedd az <span class='key'>A</span>-ra. Ez lesz a "BAL" irány. 
                A jobb gyűrűsujjadat az <span class='key'>L</span>-re, ez fogja jelölni a "JOBB" irányt. 
                A jobb mutató ujjadat helyezd az <span class='key'>N</span>-re, ez lesz a "LE" irány. 
                Míg a bal középső ujjadat pedig tedd az <span class='key'>E</span>-re, ami a "FEL" irányt fogja jelölni! </p>
                <img src="images/instruction_pic.png" alt="Hand placement instructions" style="width: 40%; height: 40%;">
                <p style="text-align: center;"><em>Amennyiben készen állsz a kísérlet megkezdésére, nyomd meg a space billentyűt!</em></p>`,
	"instruction_exp2":`<h2>Instrukciók</h2>
                <p>Ebben a kísérletben arra vagyunk kíváncsiak, hogy miként befolyásolja a büntetés és a jutalmazás a konfliktusfeldolgozást. 
                A kísérlet során iránymegjelöléseket fogsz olvasni (FEL, LE, JOBB, BAL). Először egy prime inger fog megjelenni a képernyőn, amin egy irány (pl.: „FEL”) lesz olvasható egymás alatt háromszor. 
                Ezt követően megjelenik a célinger, ami vagy azonos („FEL”) vagy ellentétes („LE”) lesz az előtte bemutatott iránnyal.
                A feladatod az lesz, hogy minél gyorsabban és pontosabban eltaláld a célinger irányát a hozzárendelt billentyű megnyomásával.</p> 
                <p>A kísérletet 2000 garassal kezded. Amikor a prime-inger <span style="color: #FF3B3B; font-weight: bold;">piros</span> színű, akkor 17 garast vonunk le tőled.
                Ha viszont <span style="color: #00E676; font-weight: bold;">zöld</span> színű prime-ingert látsz, 17 garas a jutalmad. 
                A neutrális próbákat három szín fogja jelölni: <span style="color: #2979FF; font-weight: bold;">kék</span>, <span style="color: #FFD700; font-weight: bold;">sárga</span> és <span style="color: #E040FB; font-weight: bold;">rózsaszín</span>. Ezeknél a prime próbáknál sem jutalom, sem büntetés nem jár.</p> 
								<p> Minden blokk végén látni fogod, mennyi garassal rendelkezel. Az utolsó blokk végén a kísérletért járó pontszám az eredményedtől függ: 1800 garas alatt 2,5 pont, 2200 garas felett 3,5 pont, a kettő között pedig a kiinduló 3 pont marad. </p>
                <p>Kérlek helyezd a billentyűzetre a kezedet a képen látható módon:</p>
                <p>A bal gyűrűsujjadat tedd az <span class='key'>A</span>-ra. Ez lesz a "BAL" irány. 
                A jobb gyűrűsujjadat az <span class='key'>L</span>-re, ez fogja jelölni a "JOBB" irányt. 
                A jobb mutató ujjadat helyezd az <span class='key'>N</span>-re, ez lesz a "LE" irány. 
                Míg a bal középső ujjadat pedig tedd az <span class='key'>E</span>-re, ami a "FEL" irányt fogja jelölni! </p>
                <img src="images/instruction_pic.png" alt="Hand placement instructions" style="width: 40%; height: 40%;">
                <p style="text-align: center;"><em>Amennyiben készen állsz a kísérlet megkezdésére, nyomd meg a space billentyűt!</em></p>`,
	"practice_instruction":`<h2>Gyakorló blokk</h2>
            	<p>A kísérlet megkezdése előtt egy rövid gyakorló blokk következik. 
            	A próbák 80%-át jól kell teljesítened, különben a gyakorlás újra indul. Törekedj a minél gyorsabb és pontosabb válaszadásra! <br> Ha készen állsz, nyomj meg egy tetszőleges billentyűt a kezdéshez.</p>`,
	"practice_intermission":`<div style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">
				<p>Még egy rövid gyakorló blokk következik.<br>
				 Törekedj a minél gyorsabb és pontosabb válaszadásra! <br> Ha készen állsz, nyomj meg egy tetszőleges billentyűt a kezdéshez.</p>
				<p><strong>A blokk automatikusan elindul 2 perc múlva.</strong></p>
				<p id="timer" style="font-size: 28px; color: darkred;">Kezdés: 2:00</p></div>`,
	"practice_feedback_slow":`<div style='font-size:35px;'>Túl lassú!</div>`,
	"practice_feedback_incorrect":`<div style='font-size:35px;'>Hibás válasz!</div>`,
	"practice_end":`<p> A gyakorló rész véget ért. A kísérleti blokkok következnek. A kísérleti blokkokban nem fogsz visszajelzést kapni, ha túl lassú, vagy hibás választ adtál. Törekedj a minél gyorsabb és pontosabb válaszadásra!
        		Ne feledd, <span style="color: #FF3B3B; font-weight: bold;">piros</span> próbák esetén 17 garast vonunk le tőled. <span style="color: #00E676; font-weight: bold;">Zöld</span> próbák esetén 17 garast kapsz.
				Ha készen állsz, nyomd meg a space billentyűt a kezdéshez.</p>
				<img src="images/instruction_pic.png" alt="Hand placement instructions" style="width: 40%; height: auto;">
                <p style="text-align: center;"><em>Amennyiben készen állsz a kísérlet megkezdésére, nyomd meg a space billentyűt!</em></p>`,
	"debrief":`<div style="text-align: center; max-width: 800px; margin: auto; font-size: 24px;">
				<p style="font-weight: bold; font-size: 28px; margin-bottom: 25px;"> <h3>Kedves Résztvevő!</h3></p>
				<p>Köszönjük, hogy részt vettél a kutatásunkban! Ebben a kísérletben arra voltunk kíváncsiak, hogy a jutalmazó, illetve büntető ingerek miként befolyásolják a reakcióidőt ebben a válaszinterferencia feladatban.</p>
				<p>A részvételednek köszönhetően lehetöségünk van megvizsgálni, azt hogy a büntetetés és a jutalmazás milyen hatással van agyunk egyik alapvető adaptációs mechanizmusára, melyet kognitív kontrollnak nevezünk. </p> 
				<p>Ha bármilyen észrevételed, vagy kérdésed lenne a kutatással kapcsolatban írj a <a href="mailto:bognar.miklos@ppk.elte.hu">bognar.miklos@ppk.elte.hu</a>címre!</p>`},
"eng":{
	"downprobe":"down",
	"upprobe": "up",
	"leftprobe": "left",
	"rightprobe":"right",
	"downprime":"down<br>down<br>down",
	"upprime":"up<br>up<br>up",
	"leftprime":"left<br>left<br>left",
	"rightprime":"right<br>right<br>right",
	"welcome":`<img src="images/University_logo.png" alt="University Logo" style="width: 300px; display: block; margin: auto;">
				<h2>Welcome to the study of the Metascience lab!</h2>
				<p>You are taking part in a scientific study led by Miklós Bognár, a researcher at the Department of Affective Psychology at Eötvös Loránd University (ELTE).
				The aim of this study is to examine how different types of stimuli affect reaction time.</p>
				<h3>Participation</h3>
				<p>Participation in this study is entirely voluntary. You may withdraw from the study at any time without providing a reason.
				If you have any questions, comments, or concerns regarding the study, please contact Miklós Bognár at <a href="mailto:bognar.miklos@ppk.elte.hu">bognar.miklos@ppk.elte.hu</a>.</p>`,
	"button_press":`Continue`,
	"yes/no": ["Yes", "No"],
	"finish":`Finish`,
	"fullscreen":`<p>The experiment will switch to fullscreen mode.</p>`,
	"informed_consent":`<h2>Informed Consent</h2>
				<p>With full awareness of my responsibility, I consent to the use of the data collected about me during the study that do not allow for my personal identification to be made available to other researchers.
				I reserve the right to withdraw from the study at any time during the course of the experiment.
				I declare that today I am participating in a study conducted at Eötvös Loránd University under the supervision of the principal investigator, Miklós Bognár, and that:</p>
				<ul>
				<li>I am participating voluntarily.</li>
				<li>I received adequate information about the nature of the study prior to its commencement.</li>
				<li>I do not suffer from any psychiatric disorder.</li>
				<li>I am not under the influence of alcohol or drugs at the time of the study.</li>
				</ul>
				<p>I acknowledge that my personal data suitable for identification will be treated confidentially.
				I consent to the use of the data collected about me during the study that do not allow for my personal identification to be made available to other researchers.
				I reserve the right to withdraw from the study at any time during the course of the experiment.
				In such a case, all data collected from me up to that point will be deleted.</p>
				<p>I acknowledge that I will receive course credit for the course <em>“Participation in Psychological Experiments and Scientific Activities”</em> only upon full completion of the study.</p>
				<p><strong>I have received detailed information about the circumstances of my participation in the study and agree to the conditions described above.
				If you agree with the above conditions, please click the “Yes” button.</strong></p>`,
	"data_handling":`<h2 style="text-align: center;">Data Management Information</h2>
				<p style="text-align: justify; max-width: 800px; margin: auto;">
				All personal information collected as part of this study will be treated strictly confidentially. 
				Data collected during the study will be coded and stored on secure computers. The collected data will be aggregated. 
				The Metascience Research Group of the Department of Affective Psychology at ELTE PPK, as the data controller, will handle your personal data confidentially and will not transfer it to any other data controller or processor.
				Further details on this are provided in the document <a href="http://metasciencelab.elte.hu/hozzajarulas-adatkezeleshez/" target="_blank">"Consent for Data Processing"</a>.</p>
				<p>For more detailed information about the data management regulations, see: 
				<a href="https://ppk.elte.hu/file/Hozzajarulas_adatkezeleshez_melleklet_2018.pdf" target="_blank">Data Processing Consent Appendix</a>				</p>
				<p>Your personal data collected during the study will be used solely to register your course credit for participation. 
				Identifiable data (e.g., NEPTUN code) will be deleted afterward. The data processed include:</p>
				<ul>
				<li>Age</li>
				<li>NEPTUN code</li>
				<li>Gender</li>
				</ul>
				<p>Your responses will not be linked to you in any way. Anonymized data may be shared with other researchers.</p>
				<p><strong>If you agree with the above conditions and consent to participate in the study, please click the “Yes” button.</strong></p>`,
	"age":`How old are you?`,
	"neptun":`What is your NEPTUN code?`,
	"gender":`What is your gender?`,
	"gender_options": ["Male", "Female", "Non-binary", "Prefer not to say"],
	"instruction_exp1":`<h2>Instructions</h2>
				<p>In this experiment, we are interested in how punishment and reward affect conflict processing. 
				During the experiment, you will read directional cues (UP, DOWN, RIGHT, LEFT). 
				First, a prime stimulus will appear on the screen, showing a direction (e.g., “UP”) three times, stacked vertically. 
				Then the target stimulus will appear, which will either be the same (“UP”) or the opposite (“DOWN”) of the previously presented direction. 
				Your task is to press the corresponding key as quickly and accurately as possible to indicate the direction of the target.</p>
				<p>You will start the experiment with 2000 coins. 
				When the probe appears in <span style="color: #FF3B3B; font-weight: bold;">red</span>, 17 coins will be deducted from your total. 
				If the probe is <span style="color: #00E676; font-weight: bold;">green</span>, you will receive a reward of 17 coins. 
				Neutral probe trials are indicated by three colors: <span style="color: #2979FF; font-weight: bold;">blue</span>, <span style="color: #FFD700; font-weight: bold;">yellow</span>, and <span style="color: #E040FB; font-weight: bold;">pink</span>. 
				No reward or punishment applies to these neutral probe trials.</p>
				<p>At the end of each block, you will see how many coins you have. At the end of the final block, your score depends on the number of coins: if it is below 2000, you receive 2.5 points, if it is above 2000, you receive 3.5 points. If you finish with exactly 2000 coins, the base score of 3 points remains.</p>
				<p>Please place your fingers on the keyboard as shown in the picture:</p>
				<p>Place your left ring finger on <span class='key'>A</span> — this will indicate "LEFT". 
				Place your right ring finger on <span class='key'>L</span> — this will indicate "RIGHT". 
				Place your right index finger on <span class='key'>N</span> — this will indicate "DOWN". 
				Finally, place your left middle finger on <span class='key'>E</span> — this will indicate "UP".</p>
				<img src="images/instruction_pic.png" alt="Hand placement instructions" style="width: 40%; height: 40%;">
				<p style="text-align: center;"><em>When you are ready to begin the experiment, press the spacebar!</em></p>`,
	"instruction_exp2":`<h2>Instructions</h2>
				<p>In this experiment, we are interested in how punishment and reward affect conflict processing. 
				During the experiment, you will read directional cues (UP, DOWN, RIGHT, LEFT). 
				First, a prime stimulus will appear on the screen, showing a direction (e.g., “UP”) three times, stacked vertically. 
				Then the target stimulus will appear, which will either be the same (“UP”) or the opposite (“DOWN”) of the previously presented direction. 
				Your task is to press the corresponding key as quickly and accurately as possible to indicate the direction of the target.</p>
				<p>You will start the experiment with 2000 coins. 
				When the prime appears in <span style="color: #FF3B3B; font-weight: bold;">red</span>, 17 coins will be deducted from your total. 
				If the prime is <span style="color: #00E676; font-weight: bold;">green</span>, you will receive a reward of 17 coins. 
				Neutral prime trials are indicated by three colors: <span style="color: #2979FF; font-weight: bold;">blue</span>, <span style="color: #FFD700; font-weight: bold;">yellow</span>, and <span style="color: #E040FB; font-weight: bold;">pink</span>. 
				No reward or punishment applies to these neutral prime trials.</p>
				<p>At the end of each block, you will see how many coins you have. At the end of the final block, your score depends on the number of coins: if it is below 2000, you receive 2.5 points, if it is above 2000, you receive 3.5 points. If you finish with exactly 2000 coins, the base score of 3 points remains. </p>
				<p>Please place your fingers on the keyboard as shown in the picture:</p>
				<p>Place your left ring finger on <span class='key'>A</span> — this will indicate "LEFT". 
				Place your right ring finger on <span class='key'>L</span> — this will indicate "RIGHT". 
				Place your right index finger on <span class='key'>N</span> — this will indicate "DOWN". 
				Finally, place your left middle finger on <span class='key'>E</span> — this will indicate "UP".</p>
				<img src="images/instruction_pic.png" alt="Hand placement instructions" style="width: 40%; height: 40%;">
				<p style="text-align: center;"><em>When you are ready to begin the experiment, press the spacebar!</em></p>`,
	"practice_instruction":`<h2>Practice Block</h2>
				<p>Before the main experiment begins, you will complete a short practice block. 
				You must correctly complete at least 80% of the trials, otherwise the practice block will start over. Try to respond as quickly and accurately as possible! <br> When you are ready, press any key to begin.</p>`,
	"practice_intermission":`<div style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">
				<p>Another short practice block will follow. <br> Try to respond as quickly and accurately as possible!<br>
				When you are ready, press any key to begin.</p>
				<p><strong>The block will automatically start in 2 minutes.</strong></p>
				<p id="timer" style="font-size: 28px; color: darkred;">Start: 2:00</p></div>`,
	"practice_feedback_slow": `<div style='font-size:35px;'>Too slow!</div>`,
	"practice_feedback_incorrect": `<div style='font-size:35px;'>Incorrect response!</div>`,
	"practice_end":`<p>The practice block has ended. The main experimental blocks will follow.
				During the experimental blocks, you will not receive feedback if your response is too slow or incorrect. Try to respond as quickly and accurately as possible!
				Remember, <span style="color: #FF3B3B; font-weight: bold;">red</span> trials will deduct 17 coins from your total. 
				<span style="color: #00E676; font-weight: bold;">Green</span> trials will add 17 coins to your total.
				When you are ready, press the spacebar to begin.</p>
				<br> 
				<img src="images/instruction_pic.png" alt="Hand placement instructions" style="width: 40%; height: auto;"> 
				<p style="text-align: center;"><em>When you are ready to begin the main experiment, press the spacebar!</em></p></div>`,
	"debrief":`<div style="text-align: center; max-width: 800px; margin: auto; font-size: 24px;">
				<p style="font-weight: bold; font-size: 28px; margin-bottom: 25px;"> <h3>Dear Participant!</h3></p>
				<p>Thank you for participating in our study! In this experiment, we were interested in how rewarding and punishing stimuli affect reaction time in a response interference task.</p>
				<p>Your participation allows us to examine how punishment and reward influence one of the fundamental adaptive mechanisms of our brain, known as cognitive control.</p> 
				<p>If you have any comments or questions about the study, please contact us at <a href="mailto:bognar.miklos@ppk.elte.hu">bognar.miklos@ppk.elte.hu</a></p>`
}}
