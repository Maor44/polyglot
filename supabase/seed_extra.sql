-- Additional categories
insert into categories (id, name_he, emoji, color, sort_order) values
  ('family',   'משפחה וקשרים',  '👨‍👩‍👧',  '#FF6B9D', 8),
  ('weather',  'מזג אוויר',    '⛅',     '#74C0FC', 9),
  ('hotel',    'מלון ולינה',    '🏨',     '#69DB7C', 10),
  ('work',     'עבודה ועסקים',  '💼',     '#A9E34B', 11),
  ('colors',   'צבעים ותיאורים','🎨',     '#DA77F2', 12),
  ('body',     'גוף ובריאות',   '💪',     '#FF8787', 13);

-- Levels for new categories
insert into levels (id, language_id, category_id, level_number, label_he, required_xp) values
  ('ro_family_1','ro','family',1,'מתחילים',0),
  ('ro_family_2','ro','family',2,'בינוני',0),
  ('ro_family_3','ro','family',3,'מתקדם',0),
  ('ro_weather_1','ro','weather',1,'מתחילים',0),
  ('ro_weather_2','ro','weather',2,'בינוני',0),
  ('ro_weather_3','ro','weather',3,'מתקדם',0),
  ('ro_hotel_1','ro','hotel',1,'מתחילים',0),
  ('ro_hotel_2','ro','hotel',2,'בינוני',0),
  ('ro_hotel_3','ro','hotel',3,'מתקדם',0),
  ('ro_work_1','ro','work',1,'מתחילים',0),
  ('ro_work_2','ro','work',2,'בינוני',0),
  ('ro_work_3','ro','work',3,'מתקדם',0),
  ('ro_colors_1','ro','colors',1,'מתחילים',0),
  ('ro_colors_2','ro','colors',2,'בינוני',0),
  ('ro_colors_3','ro','colors',3,'מתקדם',0),
  ('ro_body_1','ro','body',1,'מתחילים',0),
  ('ro_body_2','ro','body',2,'בינוני',0),
  ('ro_body_3','ro','body',3,'מתקדם',0);

-- ============================================================
-- FAMILY
-- ============================================================
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_family_1','mamă','אמא','מַאמֶה',false,1),
  ('ro_family_1','tată','אבא','טַאטֶה',false,2),
  ('ro_family_1','frate','אח','פְּרַאטֶה',false,3),
  ('ro_family_1','soră','אחות','סוֹרֶה',false,4),
  ('ro_family_1','bunic','סבא','בּוּנִיק',false,5),
  ('ro_family_1','bunică','סבתא','בּוּנִיקֶה',false,6),
  ('ro_family_1','copil','ילד','קוֹפִּיל',false,7),
  ('ro_family_1','soție','אישה','סוֹצִ׳ִיֶה',false,8),
  ('ro_family_1','soț','בעל','סוֹץ',false,9),
  ('ro_family_1','prieten','חבר','פְּרִיֶטֶן',false,10);

insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_family_2','Acesta este soțul meu','זה בעלי','אַצ׳ֶסְטַה אֶסְטֶה סוֹצוּל מֶאוּ',true,1),
  ('ro_family_2','Am doi copii','יש לי שני ילדים','אַם דוֹי קוֹפִּיִי',true,2),
  ('ro_family_2','Familia mea este mare','המשפחה שלי גדולה','פַּמִילִיַה מֶאַה אֶסְטֶה מַארֶה',true,3),
  ('ro_family_2','Sunt căsătorit','אני נשוי','סוּנְט קֶסֶטוֹרִיט',true,4),
  ('ro_family_2','Locuiesc cu părinții mei','אני גר עם ההורים שלי','לוֹקוּיֶסְק קוּ פֶּרִינְצִיִי מֶי',true,5),
  ('ro_family_2','Câți frați ai?','כמה אחים יש לך?','קִיצִי פְּרַאצִי אַי?',true,6),
  ('ro_family_2','Părinții mei sunt din Cluj','ההורים שלי מקלוז׳','פֶּרִינְצִיִי מֶי סוּנְט דִין קְלוּז׳',true,7),
  ('ro_family_2','Ne vizităm bunicii în weekend','אנחנו מבקרים את הסבים בסוף השבוע','נֶה בִּיזִיטֶם בּוּנִיצִיִי אִין בִּיקֶנְד',true,8);

insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_family_3','Suntem o familie numeroasă și unită','אנחנו משפחה גדולה ומלוכדת','סוּנְטֶם אוֹ פַּמִילִיֶה נוּמֶרוֹאַסֶה שִׁי אוּנִיטֶה',true,1),
  ('ro_family_3','Fiica mea se pregătește pentru examen','הבת שלי מתכוננת לבחינה','פִּיִיקַה מֶאַה סֶה פְּרֶגֶטֶשְׁטֶה פֶּנְטְרוּ אֶקְסַאמֶן',true,2),
  ('ro_family_3','Ne-am reunit după mulți ani','התאחדנו מחדש אחרי שנים רבות','נֶה-אַם רֶאוּנִיט דּוּפֶּה מוּלְצִי אַנִי',true,3),
  ('ro_family_3','Serbăm aniversarea de căsătorie','אנחנו חוגגים יום נישואים','סֶרְבֶּם אַנִיבֶּרְסַארֶה-אַ דֶה קֶסֶטוֹרִיֶה',true,4),
  ('ro_family_3','Cumnata mea locuiește în Franța','גיסתי גרה בצרפת','קוּמְנַאטַה מֶאַה לוֹקוּיֶשְׁטֶה אִין פְּרַאנְצַה',true,5),
  ('ro_family_3','Copiii noștri merg la aceeași școală','הילדים שלנו הולכים לאותה בית ספר','קוֹפִּיִיִי נוֹשְׁטְרִי מֶרְג לַה אַצֶאַשִׁי שְׁקוֹאַלֶה',true,6),
  ('ro_family_3','Sunt mândru de familia mea','אני גאה במשפחה שלי','סוּנְט מִינְדְּרוּ דֶה פַּמִילִיַה מֶאַה',true,7),
  ('ro_family_3','Îmi petrec vacanța cu rudele','אני מבלה את החופשה עם הקרובים','אִימִי פֶּטְרֶק בַּקַאנְצַה קוּ רוּדֶלֶה',true,8);

-- ============================================================
-- WEATHER
-- ============================================================
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_weather_1','soare','שמש','סוֹאַרֶה',false,1),
  ('ro_weather_1','ploaie','גשם','פְּלוֹאַיֶה',false,2),
  ('ro_weather_1','vânt','רוח','בִּינְט',false,3),
  ('ro_weather_1','nori','עננים','נוֹרִי',false,4),
  ('ro_weather_1','zăpadă','שלג','זֶפַּדֶה',false,5),
  ('ro_weather_1','cald','חם','קַלְד',false,6),
  ('ro_weather_1','frig','קר','פְּרִיג',false,7),
  ('ro_weather_1','ceață','ערפל','צ׳ֶאַצֶה',false,8),
  ('ro_weather_1','furtună','סערה','פוּרְטוּנֶה',false,9),
  ('ro_weather_1','curcubeu','קשת בענן','קוּרְקוּבֶאוּ',false,10);

insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_weather_2','Ce vreme face afară?','מה מזג האוויר בחוץ?','צֶ׳ה בְּרֶמֶה פַּאצ׳ה אַפַּארֶה?',true,1),
  ('ro_weather_2','Afară este foarte cald','בחוץ חם מאוד','אַפַּארֶה אֶסְטֶה פוֹאַרְטֶה קַלְד',true,2),
  ('ro_weather_2','Mâine va ploua','מחר יהיה גשם','מִינֶה בַּה פְּלוֹאַה',true,3),
  ('ro_weather_2','Trebuie să iau o umbrelă','אני צריך לקחת מטריה','טְרֶבּוּיֶה סֶה יַאוּ אוֹ אוּמְבְּרֶלֶה',true,4),
  ('ro_weather_2','Temperaturile sunt sub zero','הטמפרטורות מתחת לאפס','טֶמְפֶּרַטוּרִילֶה סוּנְט סוּב זֶרוֹ',true,5),
  ('ro_weather_2','Vara este sezonul meu preferat','הקיץ הוא העונה האהובה עלי','בַּארַה אֶסְטֶה סֶזוֹנוּל מֶאוּ פְּרֶפֶרַט',true,6),
  ('ro_weather_2','Este înorat și umed','מעונן ולח','אֶסְטֶה אִינוֹרַט שִׁי אוּמֶד',true,7),
  ('ro_weather_2','Cât de frig este?','כמה קר?','קִיט דֶה פְּרִיג אֶסְטֶה?',true,8);

insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_weather_3','Prognoza meteo anunță furtuni puternice','תחזית מזג האוויר מבשרת סופות חזקות','פְּרוֹגְנוֹזַה מֶטֶאוֹ אַנוּנְצֶה פוּרְטוּנִי פוּטֶרְנִיצ׳ה',true,1),
  ('ro_weather_3','Iarna aceasta a adus mult zăpadă','החורף הזה הביא הרבה שלג','יַארְנַה אַצ׳ֶאַסְטַה אַה אַדוּס מוּלְט זֶפַּדֶה',true,2),
  ('ro_weather_3','Din cauza inundațiilor, drumul este închis','בגלל השיטפונות, הכביש סגור','דִין קַאוּזַה אִינוּנְדַצִ׳ִיִילוֹר, דְּרוּמוּל אֶסְטֶה אִינְקִיס',true,3),
  ('ro_weather_3','Valul de căldură persistă de o săptămână','גל החום נמשך כבר שבוע','בַּאלוּל דֶה קֶלְדוּרֶה פֶּרְסִיסְטֶה דֶה אוֹ סֶפְּטֶמִינֶה',true,4),
  ('ro_weather_3','Schimbările climatice afectează toată lumea','שינויי האקלים משפיעים על כולם','סְקִימְבֶּרִילֶה קְלִימַאטִיצ׳ֶה אַפֶּקְטֶאזֶה טוֹאַטֶה לוּמֶה',true,5),
  ('ro_weather_3','Mi-a plăcut mai mult când era însorit','אהבתי יותר כשהיה שמשי','מִי-אַה פְּלֶקוּט מַאי מוּלְט קִינְד אֶרַה אִינְסוֹרִיט',true,6),
  ('ro_weather_3','Este periculos să conduci pe ceață densă','מסוכן לנהוג בערפל סמיך','אֶסְטֶה פֶּרִיקוּלוֹס סֶה קוֹנְדוּצִי פֶּה צ׳ֶאַצֶה דֶנְסֶה',true,7),
  ('ro_weather_3','Vara trecută a fost cea mai caldă din ultimii ani','הקיץ שעבר היה החם ביותר בשנים האחרונות','בַּארַה טְרֶקוּטֶה אַה פוֹסְט צ׳ֶה-אַ מַאי קַלְדֶה דִין אוּלְטִימִיִי אַנִי',true,8);

-- ============================================================
-- HOTEL
-- ============================================================
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_hotel_1','cameră','חדר','קַאמֶרֶה',false,1),
  ('ro_hotel_1','recepție','קבלה','רֶצֶפְּצִיֶה',false,2),
  ('ro_hotel_1','cheie','מפתח','קֶיֶה',false,3),
  ('ro_hotel_1','pat','מיטה','פַּט',false,4),
  ('ro_hotel_1','rezervare','הזמנה','רֶזֶרְבַּרֶה',false,5),
  ('ro_hotel_1','etaj','קומה','אֶטַאז׳',false,6),
  ('ro_hotel_1','lift','מעלית','לִיפְּט',false,7),
  ('ro_hotel_1','mic dejun','ארוחת בוקר','מִיק דֶז׳וּן',false,8),
  ('ro_hotel_1','prosop','מגבת','פְּרוֹסוֹפּ',false,9),
  ('ro_hotel_1','piscină','בריכה','פִּיסְצִינֶה',false,10);

insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_hotel_2','Am o rezervare pe numele meu','יש לי הזמנה על שמי','אַם אוֹ רֶזֶרְבַּרֶה פֶּה נוּמֶלֶה מֶאוּ',true,1),
  ('ro_hotel_2','Vreau să fac check-in','אני רוצה לעשות צ׳ק-אין','בְּרֵאוּ סֶה פַּק צ׳ֶק-אִין',true,2),
  ('ro_hotel_2','La ce oră este check-out?','באיזו שעה הצ׳ק-אאוט?','לַה צ׳ֶה אוֹרֶה אֶסְטֶה צ׳ֶק-אַאוּט?',true,3),
  ('ro_hotel_2','Camera mea nu are apă caldă','אין מים חמים בחדר שלי','קַאמֶרַה מֶאַה נוּ אַרֶה אַפֶּה קַלְדֶה',true,4),
  ('ro_hotel_2','Puteți aduce prosoape suplimentare?','תוכלו להביא מגבות נוספות?','פּוּטֶצִי אַדוּצ׳ה פְּרוֹסוֹאַפֶּה סוּפְּלִימֶנְטַארֶה?',true,5),
  ('ro_hotel_2','Există parcare la hotel?','האם יש חניה במלון?','אֶקְסִיסְטֶה פַּרְקַארֶה לַה הוֹטֶל?',true,6),
  ('ro_hotel_2','Aș dori o cameră cu vedere la mare','הייתי רוצה חדר עם נוף לים','אַש דוֹרִי אוֹ קַאמֶרֶה קוּ בֶּדֶרֶה לַה מַארֶה',true,7),
  ('ro_hotel_2','Este micul dejun inclus?','האם ארוחת הבוקר כלולה?','אֶסְטֶה מִיקוּל דֶז׳וּן אִינְקְלוּס?',true,8);

insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_hotel_3','Aerul condiționat din cameră nu funcționează','המזגן בחדר לא עובד','אֶרוּל קוֹנְדִיצִ׳ִיוֹנַט דִין קַאמֶרֶה נוּ פוּנְקְצִ׳ִיוֹנֶאזֶה',true,1),
  ('ro_hotel_3','Doriți să prelungim șederea cu o noapte?','האם תרצו להאריך את השהייה בלילה נוסף?','דוֹרִיצִי סֶה פְּרֶלוּנְגִים שֶׁדֶרֶה-אַ קוּ אוֹ נוֹאַפְּטֶה?',true,2),
  ('ro_hotel_3','Serviciul de room service este disponibil non-stop','שירות חדר זמין סביב השעון','סֶרְבִּיצִ׳וּל דֶה רוּם סֶרְבִּיס אֶסְטֶה דִיסְפּוֹנִיבִּיל נוֹן-סְטוֹפּ',true,3),
  ('ro_hotel_3','Am lăsat ceva în seiful din cameră','השארתי משהו בכספת שבחדר','אַם לֶסַט צ׳ֶבַה אִין סֶיפוּל דִין קַאמֶרֶה',true,4),
  ('ro_hotel_3','Puteți recomanda un restaurant din apropiere?','תוכלו להמליץ על מסעדה קרובה?','פּוּטֶצִי רֶקוֹמַנְדַה אוּן רֶסְטַאוּרַנְט דִין אַפְּרוֹפִּיֶרֶה?',true,5),
  ('ro_hotel_3','Factura nu corespunde cu rezervarea mea','החשבון לא תואם את ההזמנה שלי','פַּקְטוּרַה נוּ קוֹרֶסְפּוּנְדֶה קוּ רֶזֶרְבַּרֶה-אַ מֶאַה',true,6),
  ('ro_hotel_3','Camera are o priveliște magnifică spre munți','לחדר יש נוף מרהיב אל ההרים','קַאמֶרַה אַרֶה אוֹ פְּרִיבֶלִישְׁטֶה מַאגְנִיפִיקֶה סְפְּרֶה מוּנְצִי',true,7),
  ('ro_hotel_3','Bagajele pot fi depozitate la recepție','המזוודות יכולות להישמר בקבלה','בַּגַז׳ֶלֶה פּוֹט פִּי דֶפּוֹזִיטַאטֶה לַה רֶצֶפְּצִיֶה',true,8);

-- ============================================================
-- WORK
-- ============================================================
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_work_1','birou','משרד','בִּירוֹוּ',false,1),
  ('ro_work_1','șef','מנהל','שֶׁף',false,2),
  ('ro_work_1','coleg','עמית','קוֹלֶג',false,3),
  ('ro_work_1','salariu','משכורת','סַלַארִיוּ',false,4),
  ('ro_work_1','întâlnire','פגישה','אִינְטִילְנִירֶה',false,5),
  ('ro_work_1','proiect','פרויקט','פְּרוֹיֶקְט',false,6),
  ('ro_work_1','e-mail','אימייל','אִי-מֵיִיל',false,7),
  ('ro_work_1','laptop','לפטופ','לַפְּטוֹפּ',false,8),
  ('ro_work_1','concediu','חופשה','קוֹנְצ׳ֶדִיוּ',false,9),
  ('ro_work_1','contract','חוזה','קוֹנְטְרַקְט',false,10);

insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_work_2','Lucrez de la nouă la cinci','אני עובד מתשע עד חמש','לוּצְרֶז דֶה לַה נוֹוֶה לַה צִ׳ינְצִ׳י',true,1),
  ('ro_work_2','Am o întâlnire importantă astăzi','יש לי פגישה חשובה היום','אַם אוֹ אִינְטִילְנִירֶה אִימְפּוֹרְטַנְטֶה אַסְטֶזִי',true,2),
  ('ro_work_2','Trimit raportul prin e-mail','אני שולח את הדוח במייל','טְרִימִיט רַפּוֹרְטוּל פְּרִין אִי-מֵיִיל',true,3),
  ('ro_work_2','Sunt în concediu săptămâna viitoare','אני בחופשה שבוע הבא','סוּנְט אִין קוֹנְצ׳ֶדִיוּ סֶפְּטֶמִינַה בִּיִיטוֹאַרֶה',true,4),
  ('ro_work_2','Colegii mei sunt foarte drăguți','העמיתים שלי מאוד נחמדים','קוֹלֶגִיִי מֶי סוּנְט פוֹאַרְטֶה דְּרֶגוּצִי',true,5),
  ('ro_work_2','Termenul limită este vineri','המועד האחרון הוא יום שישי','טֶרְמֶנוּל לִימִיטֶה אֶסְטֶה בִּינֶרִי',true,6),
  ('ro_work_2','Caut un loc de muncă în IT','אני מחפש עבודה בתחום IT','קַאוּט אוּן לוֹק דֶה מוּנְקֶה אִין IT',true,7),
  ('ro_work_2','Pot lucra și de acasă','אני יכול לעבוד גם מהבית','פּוֹט לוּצְרַה שִׁי דֶה אַקַאסֶה',true,8);

insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_work_3','Prezentarea a impresionat toți participanții','המצגת הרשימה את כל המשתתפים','פְּרֶזֶנְטַארֶה-אַ אַה אִימְפְּרֶסִיוֹנַט טוֹצִי פַּרְטִיצִ׳ִיפַּנְצִיִי',true,1),
  ('ro_work_3','Negociem condițiile contractului','אנחנו מנהלים משא ומתן על תנאי החוזה','נֶגוֹצִ׳יֶם קוֹנְדִיצִ׳ִיִילֶה קוֹנְטְרַקְטוּלוּי',true,2),
  ('ro_work_3','Bugetul pentru acest trimestru a fost depășit','התקציב לרבעון זה חרג','בוּדז׳ֶטוּל פֶּנְטְרוּ אַצ׳ֶסְט טְרִימֶסְטְרוּ אַה פוֹסְט דֶפֶּשִׁיט',true,3),
  ('ro_work_3','Am fost promovat la poziția de manager','קיבלתי קידום לתפקיד מנהל','אַם פוֹסְט פְּרוֹמוֹבַט לַה פּוֹזִיצִ׳יַה דֶה מַנַאגֶר',true,4),
  ('ro_work_3','Colaborăm cu parteneri din toată Europa','אנחנו משתפים פעולה עם שותפים מכל אירופה','קוֹלַבּוֹרֶם קוּ פַּרְטֶנֶרִי דִין טוֹאַטֶה אֶאוּרוֹפַּה',true,5),
  ('ro_work_3','Strategia noastră de marketing a dat rezultate','האסטרטגיה השיווקית שלנו הניבה תוצאות','סְטְרַאטֶגִיַה נוֹאַסְטְרֶה דֶה מַארְקֶטִינְג אַה דַט רֶזוּלְטַאטֶה',true,6),
  ('ro_work_3','Echipa noastră lucrează în regim hibrid','הצוות שלנו עובד במשטר היברידי','אֶקִיפַּה נוֹאַסְטְרֶה לוּצְרֶאזֶה אִין רֶז׳ִים הִיבְּרִיד',true,7),
  ('ro_work_3','Îmi doresc o creștere salarială','אני מעוניין בעלייה בשכר','אִימִי דוֹרֶסְק אוֹ קְרֶשְׁטֶרֶה סַלַארִיַאלֶה',true,8);

-- ============================================================
-- COLORS
-- ============================================================
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_colors_1','roșu','אדום','רוֹשׁוּ',false,1),
  ('ro_colors_1','albastru','כחול','אַלְבַּאסְטְרוּ',false,2),
  ('ro_colors_1','verde','ירוק','בֶּרְדֶה',false,3),
  ('ro_colors_1','galben','צהוב','גַּלְבֶּן',false,4),
  ('ro_colors_1','negru','שחור','נֶגְרוּ',false,5),
  ('ro_colors_1','alb','לבן','אַלְב',false,6),
  ('ro_colors_1','portocaliu','כתום','פּוֹרְטוֹקַאלִיוּ',false,7),
  ('ro_colors_1','roz','ורוד','רוֹז',false,8),
  ('ro_colors_1','violet','סגול','בִּיוֹלֶט',false,9),
  ('ro_colors_1','maro','חום','מַארוֹ',false,10);

insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_colors_2','Ce culoare îți place mai mult?','איזה צבע אתה הכי אוהב?','צֶ׳ה קוּלוֹאַרֶה אִיצִי פְּלַאצ׳ה מַאי מוּלְט?',true,1),
  ('ro_colors_2','Îmi place această bluză albastră','אני אוהב את החולצה הכחולה הזו','אִימִי פְּלַאצ׳ה אַצ׳ֶאַסְטֶה בְּלוּזֶה אַלְבַּאסְטְרֶה',true,2),
  ('ro_colors_2','Geanta ta este frumoasă și roșie','התיק שלך יפה ואדום','גֶאַנְטַה טַה אֶסְטֶה פְּרוּמוֹאַסֶה שִׁי רוֹשִׁיֶה',true,3),
  ('ro_colors_2','Care este culoarea ta preferată?','מה הצבע האהוב עליך?','קַארֶה אֶסְטֶה קוּלוֹאַרֶה-אַ טַה פְּרֶפֶרַטֶה?',true,4),
  ('ro_colors_2','Mașina mea este gri și mică','המכונית שלי אפורה וקטנה','מַשִׁינַה מֶאַה אֶסְטֶה גְּרִי שִׁי מִיקֶה',true,5),
  ('ro_colors_2','Îmbrăcați-vă în alb și negru','התלבשו בלבן ושחור','אִימְבְּרֶקַצִי-בֶּה אִין אַלְב שִׁי נֶגְרוּ',true,6),
  ('ro_colors_2','Florile sunt galbene și parfumate','הפרחים צהובים ומבושמים','פְּלוֹרִילֶה סוּנְט גַּלְבֶּנֶה שִׁי פַּרְפוּמַאטֶה',true,7),
  ('ro_colors_2','Cerul este albastru și senin','השמיים כחולים ובהירים','צ׳ֶרוּל אֶסְטֶה אַלְבַּאסְטְרוּ שִׁי סֶנִין',true,8);

insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_colors_3','Nuanțele de verde ale naturii sunt incredibile','גווני הירוק של הטבע מדהימים','נוּאַנְצֶלֶה דֶה בֶּרְדֶה אַלֶה נַאטוּרִיִי סוּנְט אִינְקְרֶדִיבִּילֶה',true,1),
  ('ro_colors_3','Tabloul combină culori vii cu tonuri pastelate','הציור משלב צבעים עזים עם גוונים פסטלים','טַבְּלוֹוּל קוֹמְבִּינֶה קוּלוֹרִי בִּיִי קוּ טוֹנוּרִי פַּסְטֶלַאטֶה',true,2),
  ('ro_colors_3','Rochia aceea violet închis este elegantă','השמלה הסגולה הכהה ההיא אלגנטית','רוֹקִיַה אַצֶאַה בִּיוֹלֶט אִינְקִיס אֶסְטֶה אֶלֶגַנְטֶה',true,3),
  ('ro_colors_3','Combinând roșu cu portocaliu obții o culoare caldă','שילוב אדום עם כתום יוצר צבע חם','קוֹמְבִּינִינְד רוֹשׁוּ קוּ פּוֹרְטוֹקַאלִיוּ אוֹבְּצִי אוֹ קוּלוֹאַרֶה קַלְדֶה',true,4),
  ('ro_colors_3','Designerul preferă tonuri neutre și minimaliste','המעצב מעדיף גוונים ניטרלים ומינימליסטים','דֶזִיגְנֶרוּל פְּרֶפֶרֶה טוֹנוּרִי נֶאוּטְרֶה שִׁי מִינִימַאלִישְׁטֶה',true,5),
  ('ro_colors_3','Apusul de soare colorează cerul în nuanțe de portocaliu','השקיעה צובעת את השמיים בגוונים כתומים','אַפּוּסוּל דֶה סוֹאַרֶה קוֹלוֹרֶאזֶה צ׳ֶרוּל אִין נוּאַנְצֶ דֶה פּוֹרְטוֹקַאלִיוּ',true,6),
  ('ro_colors_3','Alb-negrul fotografiei îi conferă un aer retro','שחור-הלבן של הצילום נותן לו אווירה רטרו','אַלְב-נֶגְרוּל פוֹטוֹגְרַפִּיֶי אִי קוֹנְפֶרֶה אוּן אֶר רֶטְרוֹ',true,7),
  ('ro_colors_3','Culorile calde transmit energie și bucurie','צבעים חמים מעבירים אנרגיה ושמחה','קוּלוֹרִילֶה קַלְדֶה טְרַנְסְמִיט אֶנֶרְגִיֶה שִׁי בּוּקוּרִיֶה',true,8);

-- ============================================================
-- BODY
-- ============================================================
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_body_1','cap','ראש','קַפּ',false,1),
  ('ro_body_1','mână','יד','מִינֶה',false,2),
  ('ro_body_1','picior','רגל','פִּיצִ׳וֹר',false,3),
  ('ro_body_1','ochi','עיניים','אוֹקִי',false,4),
  ('ro_body_1','ureche','אוזן','אוּרֶקֶה',false,5),
  ('ro_body_1','nas','אף','נַס',false,6),
  ('ro_body_1','gură','פה','גוּרֶה',false,7),
  ('ro_body_1','inimă','לב','אִינִימֶה',false,8),
  ('ro_body_1','spate','גב','סְפַּאטֶה',false,9),
  ('ro_body_1','stomac','בטן','סְטוֹמַק',false,10);

insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_body_2','Mă doare capul de dimineață','כואב לי הראש מהבוקר','מֶה דוֹאַרֶה קַפּוּל דֶה דִימִינֶאַצֶה',true,1),
  ('ro_body_2','Mi-am rupt mâna stângă','שברתי את היד השמאלית','מִי-אַם רוּפְּט מִינַה סְטִינְגֶה',true,2),
  ('ro_body_2','Am nevoie să văd un medic','אני צריך לראות רופא','אַם נֶבוֹיֶה סֶה בֶּד אוּן מֶדִיק',true,3),
  ('ro_body_2','Fac sport de trei ori pe săptămână','אני מתאמן שלוש פעמים בשבוע','פַּק סְפּוֹרְט דֶה טְרֵי אוֹרִי פֶּה סֶפְּטֶמִינֶה',true,4),
  ('ro_body_2','Stomacul meu doare după masă','הבטן שלי כואבת אחרי האוכל','סְטוֹמַקוּל מֶאוּ דוֹאַרֶה דּוּפֶּה מַאסֶה',true,5),
  ('ro_body_2','Am nevoie de ochelari pentru citit','אני צריך משקפיים לקריאה','אַם נֶבוֹיֶה דֶה אוֹקֶלַארִי פֶּנְטְרוּ צִיטִיט',true,6),
  ('ro_body_2','Trebuie să mă odihnesc mai mult','אני צריך לנוח יותר','טְרֶבּוּיֶה סֶה מֶה אוֹדִיהְנֶסְק מַאי מוּלְט',true,7),
  ('ro_body_2','Tensiunea mea este ridicată','לחץ הדם שלי גבוה','טֶנְסִיוּנֶה-אַ מֶאַה אֶסְטֶה רִידִיקַטֶה',true,8);

insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_body_3','Medicul mi-a recomandat odihnă completă o săptămână','הרופא המליץ לי על מנוחה מלאה שבוע','מֶדִיקוּל מִי-אַה רֶקוֹמַנְדַט אוֹדִיהְנֶה קוֹמְפְּלֶטֶה אוֹ סֶפְּטֶמִינֶה',true,1),
  ('ro_body_3','Exercițiile fizice regulate îmbunătățesc sănătatea','פעילות גופנית סדירה משפרת את הבריאות','אֶקְסֶרְצִ׳ִיצִ׳ִילֶה פִּיזִיצ׳ה רֶגוּלַאטֶה אִימְבּוּנֶטֶצ׳ֶסְק סֶנֶטַאטֶה-אַ',true,2),
  ('ro_body_3','Sunt alergic la medicamente antiinflamatoare','אני אלרגי לתרופות אנטי-דלקתיות','סוּנְט אַלֶרְגִיק לַה מֶדִיקַמֶנְטֶה אַנְטִיאִינְפְּלַמַאטוֹאַרֶה',true,3),
  ('ro_body_3','Rezultatele analizelor de sânge sunt normale','תוצאות בדיקות הדם תקינות','רֶזוּלְטַאטֶלֶה אַנַאלִיזֶלוֹר דֶה סִינְגֶה סוּנְט נוֹרְמַאלֶה',true,4),
  ('ro_body_3','Fizioterapeutul mi-a prescris exerciții zilnice','הפיזיותרפיסט רשם לי תרגילים יומיים','פִּיזִיוֹטֶרַפֶאוּטוּל מִי-אַה פְּרֶסְקְרִיס אֶקְסֶרְצִ׳ִיצִ׳ִי זִילְנִיצ׳ה',true,5),
  ('ro_body_3','Operația a decurs fără complicații','הניתוח עבר ללא סיבוכים','אוֹפֶּרַצִ׳יַה אַה דֶקוּרְס פֶּרֶה קוֹמְפְּלִיקַצִ׳ִי',true,6),
  ('ro_body_3','Dieta mediteraneană este benefică pentru inimă','התזונה הים-תיכונית מועילה ללב','דִיֶטַה מֶדִיטֶרַאנֶאַה אֶסְטֶה בֶּנֶפִיקֶה פֶּנְטְרוּ אִינִימֶה',true,7),
  ('ro_body_3','Tensiunea arterială trebuie monitorizată zilnic','לחץ הדם צריך להיות מנוטר מדי יום','טֶנְסִיוּנֶה-אַ אַרְטֶרִיַאלֶה טְרֶבּוּיֶה מוֹנִיטוֹרִיזַטֶה זִילְנִיק',true,8);
