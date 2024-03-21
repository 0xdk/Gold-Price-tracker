// Other Language
let isTamil = false;

function toggleLanguage() {
  isTamil = !isTamil;
  updateToTamil();
}

function updateToTamil() {
  // Select the element with the class 'gram'
  let gramElements = document.querySelectorAll('.gram');

  // Loop through the selected elements
  gramElements.forEach(function (gramElement) {
    gramElement.textContent = isTamil ? 'கி' : 'Gram ';
  });

  // Update card title
  document.getElementById('cardTitle').textContent = isTamil
    ? 'சென்னையில் இன்றைய தங்கம் விலை'
    : "Today's Gold Rate in Chennai";

  // Update information text
  document.getElementById('peraText1').textContent = isTamil
    ? 'சென்னையில் இன்று, 22-காரட் தங்கம் சவரன் ஒன்றுக்கு '
    : 'Gold in Chennai today is';

  // Update the text in overlay card
  document.getElementById('peraText2').textContent = isTamil
    ? 'ஆகவும், 24-காரட் தங்கம் சவரனுக்கு'
    : 'per Savaran for 22-karat gold and';

  document.getElementById('peraText3').textContent = isTamil
    ? 'ஆகவும் உள்ளது (999 தங்கம் ).'
    : 'per Savaran for 24-karat gold (also called 999 gold).';

  document.getElementById('email-form-pera').textContent = isTamil
    ? 'தினசரி தங்கத்தின் விலை மற்றும் கடந்த 10 நாட்கள் தங்கத்தின் விலையை  மின்னஞ்சலைப் பெறுவீர்கள்'
    : 'You will receive a Email with Daily Gold Price and  last 10 Days Price HistoryGet daily gold price updates delivered to your inbox';

  document.querySelector('.paragraph-title').textContent = isTamil
    ? 'தங்கம் பற்றிய சுவாரஸ்யமான தகவல்கள்'
    : 'Interesting information about Gold';
  document.querySelector('.gold-rate-table-title').textContent = isTamil
    ? 'சென்னையில் கடந்த 10 நாட்களாக தங்கம் விலை'
    : 'Gold Rate in Chennai for Last 10 Days';

  document.getElementById('signupForm').textContent = isTamil
    ? 'தங்கம் விலை அறிந்து கொள்ள பதிவு செய்யவும்'
    : 'Sign-Up for Gold Price Update';

  document.querySelector('.signupLink').textContent = isTamil
    ? 'பதிவுசெய்தல்'
    : 'Sign up';

  document.getElementById('form-label').textContent = isTamil
    ? 'சரியான மின்னஞ்சல் முகவரியை அளிக்கவும்'
    : 'Enter a valid email address';

  document.querySelector('.form-label').textContent = isTamil
    ? 'மின்னஞ்சல் முகவரி'
    : 'Email address';

  document.querySelector('.lang-btn').textContent = isTamil
    ? 'English'
    : 'தமிழ்';

  // translating all the heading
  let headingElements = document.querySelectorAll('.paragraphs-header');

  const translations_heading = {
    en: [
      'What is 24 Karat Gold:',
      'What is 22 Karat Gold:',
      'Tax on sale of Gold:',
      'Gold as a asset:',
      'Gold as a Investment:',
      'Tips to Know Before Investing in Gold:',
    ],
    ta: [
      '24 காரட் தங்கம் என்றால் என்ன:',
      '22 காரட் தங்கம் என்றால் என்ன:',
      'தங்கம் விற்பனை மீதான வரி:',
      'தங்கம் சேமிப்பு:',
      'தங்கம் முதலீடு:',
      'தங்கத்தில் முதலீடு செய்வதற்கு முன் தெரிந்து கொள்ள வேண்டிய குறிப்புகள்:',
    ],
  };

  // Loop through the selected elements
  headingElements.forEach(function (headingElement, index) {
    // Set translated text directly using the index
    headingElement.textContent =
      translations_heading[isTamil ? 'ta' : 'en'][index];
  });

  // translating all the Paragraph
  let paragraphsContent = document.querySelectorAll('.paragraphs_content');

  const translations = {
    en: [
      "Essentially, 24 Karat gold is the purest form, containing 99.9% gold without any other metal. It has a deep yellow hue and is globally acknowledged as superior. In Chennai, there's a significant demand for 24-karat gold, often seen in Coins and Bars. While prized for its purity, 24 Karat gold is relatively soft, making it less suitable for durable jewelry. Instead, it finds value in various applications, including medical devices.",
      "Unlike 24 Karat gold, which is very pure, 22 Karat gold is a mix of pure gold and other metals like Zinc, Silver, Nickel, and alloys. It's about 91.67% pure gold and 8% other metals. This mixture makes 22 Karat gold harder than 24 Karat gold, making it a good choice for durable and detailed jewelry that you can wear every day.",
      'Taxes apply to gold, including capital gains tax and wealth tax. If you thought there were no taxes applicable to gold, you are making a mistake. If your gold value exceeds Rs 30 lakhs, you must pay a wealth tax of 1% of the value for that financial year. Valuation needs to be done by March 31, 2017, regardless of the purchase rates in Chennai.',

      'Gold serves as a safety net, especially in tough financial times. It can be sold for urgent needs, ensuring a return on investment. Passed down through generations, gold holds special significance in families.',
      'Jewelry: In Chennai, gold jewelry is a popular choice, especially for weddings, reflecting a cherished tradition.',
      'Bullion: Some prefer investing in gold bars, known as bullion, with value determined by purity and weight.',
      'Coins: Investors also opt for gold coins, available in various weights and types, providing flexibility.',
      'Commodity Exchange: Gold is treated as a wealth-creating commodity, traded on platforms like NCDEX and MCX for different durations.s',
      ' - Research Gold Prices: Before investing in gold, research current prices in Chennai. Websites like Gold-Price-Tracker or  ',
      "for Daily Gold Price Update, allowing you to compare Chennai's gold rates with other cities in India. ",

      ' -Buy Gold from Reputable: Purchase gold from trusted dealers in Chennai for quality assurance at fair prices. Developing relationships with reliable dealers is crucial for secure investments. ',
      ' -Consider Gold ETFs: Explore gold exchange-traded funds (ETFs) for investment without physical ownership. These traded funds offer a convenient way to diversify portfolios. ',
      " -Invest for Long-Term: Gold tends to appreciate over time, making long-term investment strategies advisable. This approach allows investors to capitalize on gold's appreciation potential",
      ' - Diversify Your Portfolio: Avoid concentrating investments solely in gold. Diversifying portfolios with other assets helps mitigate risks and achieve a balanced investment strategy. ',
      'Investing in gold is a smart choice for those seeking a secure and reliable option. Gold, known for safeguarding against inflation and economic uncertainties, acts as a safety net for investments. Historically significant in the monetary systems of various countries, including India, Britain, and the United States, gold offers diverse investment avenues. These include purchasing physical gold (24-karat or 22-karat), gold coins, or bars, along with options like Mutual Funds, ETFs with gold, Gold Options/Gold Futures, and shares in gold-mining companies.',
      'Investors can choose from various types of gold, including:',
      ' - Physical gold (24-karat gold, 22-karat gold, gold coins, bars)',
      ' - Mutual Funds and ETFs with gold ownership',
      ' - Shares in gold-mining public companies',
      ' - Sovereign Gold Bond Schemes.',
    ],
    ta: [
      '24 காரட் தங்கம் தூய்மையான வடிவமாகும், இதில் வேறு எந்த உலோகமும் இல்லாமல் 99.9% தங்கம் உள்ளது. இது ஆழமான மஞ்சள் நிறத்தைக் கொண்டுள்ளது மற்றும் உலகளவில் உயர்ந்ததாக அங்கீகரிக்கப்பட்டுள்ளது. சென்னையில், பெரும்பாலும் நாணயங்கள் மற்றும் பார்களில் காணப்படும் 24 காரட் தங்கத்திற்கு குறிப்பிடத்தக்க தேவை உள்ளது. 24 காரட் தங்கம் அதன் தூய்மைக்காக மதிக்கப்படும் அதே வேளையில், 24 காரட் தங்கம் ஒப்பீட்டளவில் மென்மையானது, இது நீடித்த நகைகளுக்கு மிகவும் பொருத்தமானதாக இல்லை. மாறாக, மருத்துவ சாதனங்கள் உட்பட பல்வேறு பயன்பாடுகளில் இது மதிப்பைக் கண்டறிகிறது.',
      '22 காரட் தங்கம் என்பது தூய தங்கம் மற்றும் துத்தநாகம், வெள்ளி, நிக்கல் மற்றும் உலோகக் கலவைகள் போன்ற உலோகங்களின் கலவையாகும். இது 91.67% தூய தங்கம் மற்றும் 8% மற்ற உலோகங்கள். இந்த கலவையானது 24 காரட் தங்கத்தை விட 22 காரட் தங்கத்தை கடினமாக்குகிறது, இது நீங்கள் தினமும் அணியக்கூடிய நகைகளுக்கு சிறந்த தேர்வாக அமைகிறது.',
      'மூலதன ஆதாய(capital gains) வரி மற்றும் செல்வ வரி உட்பட தங்கத்திற்கு வரிகள் பொருந்தும். தங்கத்திற்கு எந்த வரியும் இல்லை என்று நீங்கள் நினைத்தால், நீங்கள் தவறு செய்கிறீர்கள். உங்கள் தங்கத்தின் மதிப்பு ரூ. 30 லட்சத்துக்கு மேல் இருந்தால், அந்த நிதியாண்டின் மதிப்பில் 1% சொத்து வரி செலுத்த வேண்டும். சென்னையில் கொள்முதல் விலையைப் பொருட்படுத்தாமல், மார்ச் 31, 2017க்குள் மதிப்பீடு செய்யப்பட வேண்டும்.',

      'தங்கம் ஒரு பாதுகாப்பு வலையாக செயல்படுகிறது, குறிப்பாக கடினமான நிதி காலங்களில். இது அவசரத் தேவைகளுக்காக விற்கப்படலாம், முதலீட்டில் லாபம் கிடைக்கும். பரம்பரை பரம்பரையாக, குடும்பங்களில் தங்கம் சிறப்பு முக்கியத்துவம் பெறுகிறது.',
      'நகைகள்: சென்னையில், தங்க நகைகள் ஒரு பிரபலமான தேர்வாகும், குறிப்பாக திருமணங்களுக்கு, நேசத்துக்குரிய பாரம்பரியத்தை பிரதிபலிக்கிறது.',
      'பொன்: சிலர் தங்கக் கட்டிகளில் முதலீடு செய்ய விரும்புகிறார்கள், இது புல்லியன் எனப்படும், இதன் மதிப்பு தூய்மை மற்றும் எடையால் தீர்மானிக்கப்படுகிறது.',
      'நாணயங்கள்: முதலீட்டாளர்கள் தங்க நாணயங்களைத் தேர்வு செய்கிறார்கள், அவை பல்வேறு எடைகள் மற்றும் வகைகளில் கிடைக்கின்றன, இது நெகிழ்வுத்தன்மையை வழங்குகிறது.',
      'கமாடிட்டி எக்ஸ்சேஞ்ச்: தங்கம் செல்வத்தை உருவாக்கும் பொருளாகக் கருதப்படுகிறது, NCDEX மற்றும் MCX போன்ற தளங்களில் வெவ்வேறு காலகட்டங்களுக்கு வர்த்தகம் செய்யப்படுகிறது.',
      ' -தங்கத்தின் விலைகளை ஆராயுங்கள்: தங்கத்தில் முதலீடு செய்வதற்கு முன், சென்னையில் தற்போதைய விலையை ஆராயுங்கள். Gold-Price-Tracker போன்ற இணையதளங்கள் மற்றும் தினசரி தங்க விலை அறிக்கைக்கு ',
      ', இந்தியாவின் மற்ற நகரங்களுடன் சென்னையின் தங்க விலைகளை ஒப்பிட்டுப் பார்க்க உங்களை அனுமதிக்கிறது. ',

      ' -புகழ்பெற்ற நிறுவனத்திடம் இருந்து தங்கத்தை வாங்கவும்: நியாயமான விலையில் தர உத்தரவாதத்திற்காக சென்னையில் உள்ள நம்பகமான டீலர்களிடமிருந்து தங்கத்தை வாங்கவும். நம்பகமான டீலர்களுடன் உறவுகளை வளர்த்துக்கொள்வது பாதுகாப்பான முதலீடுகளுக்கு முக்கியமானது. ',
      ' -தங்க ETFs நிதிகளைக் கவனியுங்கள்: தங்கப் பரிவர்த்தனை-வர்த்தக நிதிகளை (ETFs) பௌதீக உரிமையில்லாமல் முதலீடு செய்ய ஆராயுங்கள். இந்த வர்த்தக நிதிகள் போர்ட்ஃபோலியோக்களை பல்வகைப்படுத்த வசதியான வழியை வழங்குகின்றன. ',
      ' -நீண்ட கால முதலீடு: தங்கம் காலப்போக்கில் மதிப்பை அதிகரிக்கும், நீண்ட கால முதலீட்டு உத்திகளை அறிவுறுத்துகிறது. இந்த அணுகுமுறை முதலீட்டாளர்களுக்கு தங்கத்தின் மதிப்புமிக்க திறனைப் பயன்படுத்த அனுமதிக்கிறது ',
      ' -உங்கள் போர்ட்ஃபோலியோவை பன்முகப்படுத்துங்கள்: தங்கத்தில் மட்டும் முதலீடு செய்வதைத் தவிர்க்கவும். பிற சொத்துக்களுடன் போர்ட்ஃபோலியோக்களை பல்வகைப்படுத்துவது அபாயங்களைக் குறைக்கவும், சமநிலையான முதலீட்டு உத்தியை அடையவும் உதவுகிறது.',
      'பாதுகாப்பான மற்றும் நம்பகமான விருப்பத்தைத் தேடுபவர்களுக்கு தங்கத்தில் முதலீடு செய்வது ஒரு சிறந்த தேர்வாகும். தங்கம், பணவீக்கம் மற்றும் பொருளாதார நிச்சயமற்ற தன்மைகளுக்கு எதிராக பாதுகாப்பதற்காக அறியப்படுகிறது, முதலீடுகளுக்கான பாதுகாப்பு வலையாக செயல்படுகிறது. இந்தியா, பிரிட்டன் மற்றும் அமெரிக்கா உட்பட பல்வேறு நாடுகளின் நாணய அமைப்புகளில் வரலாற்று முக்கியத்துவம் வாய்ந்த தங்கம் பல்வேறு முதலீட்டு வழிகளை வழங்குகிறது. மியூச்சுவல் ஃபண்டுகள், தங்கத்துடன் கூடிய ப.ப.வ.நிதிகள்(ETF), தங்க விருப்பத்தேர்வுகள்/தங்க எதிர்காலம் மற்றும் தங்கச் சுரங்க நிறுவனங்களின் பங்குகள் போன்ற விருப்பங்களுடன், தங்கம் (24-காரட் அல்லது 22-காரட்), தங்க நாணயங்கள் அல்லது பார்களை வாங்குவது ஆகியவை இதில் அடங்கும்.',
      'முதலீட்டாளர்கள் பல்வேறு வகையான தங்கத்திலிருந்து தேர்வு செய்யலாம், அவற்றுள்:',
      ' - தங்கம் (24-காரட் தங்கம், 22-காரட் தங்கம், தங்க நாணயங்கள், பார்கள்)',
      ' - மியூச்சுவல் ஃபண்டுகள்(Mutual Funds) மற்றும் ETFs தங்கத்தின் உரிமையுடன்',
      ' - தங்கம் சுரங்க பொது நிறுவனங்களில் பங்குகள்',
      ' - இறையாண்மை(Sovereign) தங்கப் பத்திரத் திட்டங்கள்.',
    ],
  };
  paragraphsContent.forEach(function (headingElement, index) {
    // Set translated text directly using the index
    headingElement.textContent = translations[isTamil ? 'ta' : 'en'][index];
  });
}
