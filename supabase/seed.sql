-- Languages
insert into languages (id, name_he, name_native, flag_emoji, tts_locale, sort_order) values
  ('ro', 'רומנית', 'Română', '🇷🇴', 'ro-RO', 1);

-- Categories
insert into categories (id, name_he, emoji, color, sort_order) values
  ('introductions', 'הכרות', '👋', '#FF6B6B', 1),
  ('coffee', 'קפה ואוכל', '☕', '#C8956C', 2),
  ('restaurant', 'מסעדה', '🍽️', '#51CF66', 3),
  ('shopping', 'קניות', '🛍️', '#845EF7', 4),
  ('directions', 'כיוונים ותחבורה', '🗺️', '#339AF0', 5),
  ('numbers', 'מספרים וזמן', '🔢', '#FF922B', 6),
  ('emergency', 'חירום ובריאות', '🏥', '#F06595', 7);

-- Levels (Romanian × 7 categories × 3 levels)
insert into levels (id, language_id, category_id, level_number, label_he, required_xp) values
  ('ro_introductions_1', 'ro', 'introductions', 1, 'מתחילים', 0),
  ('ro_introductions_2', 'ro', 'introductions', 2, 'בינוני', 0),
  ('ro_introductions_3', 'ro', 'introductions', 3, 'מתקדם', 0),
  ('ro_coffee_1', 'ro', 'coffee', 1, 'מתחילים', 0),
  ('ro_coffee_2', 'ro', 'coffee', 2, 'בינוני', 0),
  ('ro_coffee_3', 'ro', 'coffee', 3, 'מתקדם', 0),
  ('ro_restaurant_1', 'ro', 'restaurant', 1, 'מתחילים', 0),
  ('ro_restaurant_2', 'ro', 'restaurant', 2, 'בינוני', 0),
  ('ro_restaurant_3', 'ro', 'restaurant', 3, 'מתקדם', 0),
  ('ro_shopping_1', 'ro', 'shopping', 1, 'מתחילים', 0),
  ('ro_shopping_2', 'ro', 'shopping', 2, 'בינוני', 0),
  ('ro_shopping_3', 'ro', 'shopping', 3, 'מתקדם', 0),
  ('ro_directions_1', 'ro', 'directions', 1, 'מתחילים', 0),
  ('ro_directions_2', 'ro', 'directions', 2, 'בינוני', 0),
  ('ro_directions_3', 'ro', 'directions', 3, 'מתקדם', 0),
  ('ro_numbers_1', 'ro', 'numbers', 1, 'מתחילים', 0),
  ('ro_numbers_2', 'ro', 'numbers', 2, 'בינוני', 0),
  ('ro_numbers_3', 'ro', 'numbers', 3, 'מתקדם', 0),
  ('ro_emergency_1', 'ro', 'emergency', 1, 'מתחילים', 0),
  ('ro_emergency_2', 'ro', 'emergency', 2, 'בינוני', 0),
  ('ro_emergency_3', 'ro', 'emergency', 3, 'מתקדם', 0);

-- ============================================================
-- VOCABULARY — INTRODUCTIONS
-- ============================================================

-- הכרות — רמה 1
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_introductions_1', 'Bună', 'שלום (היי)', 'בּוּנֶה', false, 1),
  ('ro_introductions_1', 'Salut', 'היי', 'סַלוּט', false, 2),
  ('ro_introductions_1', 'Da', 'כן', 'דַה', false, 3),
  ('ro_introductions_1', 'Nu', 'לא', 'נוּ', false, 4),
  ('ro_introductions_1', 'Mulțumesc', 'תודה', 'מוּלצוּמֶסְק', false, 5),
  ('ro_introductions_1', 'Bună ziua', 'יום טוב', 'בּוּנֶה זִיוּאַה', true, 6),
  ('ro_introductions_1', 'La revedere', 'להתראות', 'לַה רֶבֶדֶרֶה', true, 7),
  ('ro_introductions_1', 'Te rog', 'בבקשה', 'טֶה רוֹג', true, 8),
  ('ro_introductions_1', 'Scuze', 'סליחה', 'סְקוּזֶה', false, 9),
  ('ro_introductions_1', 'Noapte bună', 'לילה טוב', 'נוֹאַפְטֶה בּוּנֶה', true, 10);

-- הכרות — רמה 2
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_introductions_2', 'Ce mai faci?', 'מה שלומך?', 'צֶ׳ה מַאי פַאצ׳?', true, 1),
  ('ro_introductions_2', 'Mă numesc...', 'קוראים לי...', 'מֶה נוּמֶסְק', true, 2),
  ('ro_introductions_2', 'Cum te cheamă?', 'איך קוראים לך?', 'קוּם טֶה קְיַאמֶה?', true, 3),
  ('ro_introductions_2', 'Încântat de cunoștință', 'נעים מאוד', 'אִינְקֶנְטַט דֶה קוּנוֹשְׁטִינְצֶה', true, 4),
  ('ro_introductions_2', 'Sunt din Israel', 'אני מישראל', 'סוּנְט דִין יִשְׂרָאֵל', true, 5),
  ('ro_introductions_2', 'Foarte bine, mulțumesc', 'מצוין, תודה', 'פוֹאַרְטֶה בִּינֶה', true, 6),
  ('ro_introductions_2', 'Și tu?', 'ואתה?', 'שִׁי טוּ?', true, 7),
  ('ro_introductions_2', 'Nu vorbesc română', 'אני לא מדבר רומנית', 'נוּ בוֹרְבֶּסְק רוֹמֶנֶה', true, 8),
  ('ro_introductions_2', 'Vorbești engleză?', 'אתה מדבר אנגלית?', 'בוֹרְבֶּשְׁטִי אֶנְגְלֶזֶה?', true, 9),
  ('ro_introductions_2', 'Câți ani ai?', 'בן כמה אתה?', 'קִיצִי אַנִי אַי?', true, 10);

-- הכרות — רמה 3
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_introductions_3', 'De unde ești?', 'מאיפה אתה?', 'דֶה אוּנְדֶה אֶשְׁטִי?', true, 1),
  ('ro_introductions_3', 'Sunt în vacanță în România', 'אני בחופשה ברומניה', 'סוּנְט אִין וַקַנְצֶה אִין רוֹמֶנִיַה', true, 2),
  ('ro_introductions_3', 'Îmi pare rău că nu înțeleg', 'מצטער שאני לא מבין', 'אִימִי פַּארֶה רֶאוּ', true, 3),
  ('ro_introductions_3', 'Poți vorbi mai rar, te rog?', 'יכול לדבר יותר לאט?', 'פּוֹצִי בוֹרְבִּי מַאי רַר, טֶה רוֹג?', true, 4),
  ('ro_introductions_3', 'Îmi place foarte mult România', 'מאוד אוהב את רומניה', 'אִימִי פְּלַאצֶ׳ה פוֹאַרְטֶה מוּלְט', true, 5),
  ('ro_introductions_3', 'Ce faci în timpul liber?', 'מה אתה עושה בזמן הפנוי?', 'צֶ׳ה פַאצִ׳ אִין טִימְפּוּל לִיבֶּר?', true, 6),
  ('ro_introductions_3', 'Mă bucur că ne-am cunoscut', 'שמח שנפגשנו', 'מֶה בוּקוּר קֶה נֶה-אַם קוּנוֹסְקוּט', true, 7),
  ('ro_introductions_3', 'Lucrez în domeniul IT', 'אני עובד בתחום ה-IT', 'לוּצְרֶז אִין דוֹמֶנִיוּל', true, 8);

-- ============================================================
-- VOCABULARY — COFFEE
-- ============================================================

-- קפה ואוכל — רמה 1
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_coffee_1', 'cafea', 'קפה', 'קַפֶּה-אַה', false, 1),
  ('ro_coffee_1', 'apă', 'מים', 'אַפֶּה', false, 2),
  ('ro_coffee_1', 'lapte', 'חלב', 'לַפְּטֶה', false, 3),
  ('ro_coffee_1', 'zahăr', 'סוכר', 'זַהֶר', false, 4),
  ('ro_coffee_1', 'pâine', 'לחם', 'פִּינֶה', false, 5),
  ('ro_coffee_1', 'unt', 'חמאה', 'אוּנְט', false, 6),
  ('ro_coffee_1', 'ceai', 'תה', 'צ׳אַי', false, 7),
  ('ro_coffee_1', 'suc', 'מיץ', 'סוּק', false, 8),
  ('ro_coffee_1', 'tort', 'עוגה', 'טוֹרְט', false, 9),
  ('ro_coffee_1', 'biscuiți', 'ביסקויטים', 'בִּיסְקוּיצִי', false, 10);

-- קפה ואוכל — רמה 2
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_coffee_2', 'Un cappuccino, te rog', 'קפוצ׳ינו אחד, בבקשה', 'אוּן קַפּוּצִ׳ינוֹ, טֶה רוֹג', true, 1),
  ('ro_coffee_2', 'Cât costă un espresso?', 'כמה עולה אספרסו?', 'קִיט קוֹסְטֶה אוּן אֶסְפְּרֶסוֹ?', true, 2),
  ('ro_coffee_2', 'Vreau un suc de portocale', 'אני רוצה מיץ תפוזים', 'בְּרֵאוּ אוּן סוּק דֶה פּוֹרְטוֹקַאלֶה', true, 3),
  ('ro_coffee_2', 'Fără zahăr, te rog', 'בלי סוכר, בבקשה', 'פֶּרֶה זַהֶר, טֶה רוֹג', true, 4),
  ('ro_coffee_2', 'Cu lapte, te rog', 'עם חלב, בבקשה', 'קוּ לַפְּטֶה, טֶה רוֹג', true, 5),
  ('ro_coffee_2', 'Aveți și ceai?', 'יש לכם גם תה?', 'אַבֶּצִי שִׁי צ׳אַי?', true, 6),
  ('ro_coffee_2', 'Îmi puteți aduce nota?', 'תוכל להביא לי את החשבון?', 'אִימִי פּוּטֶצִי אַדוּצֶ׳ה נוֹטַה?', true, 7),
  ('ro_coffee_2', 'Ceva dulce, te rog', 'משהו מתוק, בבקשה', 'צ׳ֶבַה דוּלְצֶ׳ה, טֶה רוֹג', true, 8),
  ('ro_coffee_2', 'Unde pot lua micul dejun?', 'איפה אפשר לקחת ארוחת בוקר?', 'אוּנְדֶה פּוֹט לוּאַה מִיקוּל דֶז׳וּן?', true, 9),
  ('ro_coffee_2', 'Un pahar cu apă, te rog', 'כוס מים, בבקשה', 'אוּן פַּהַר קוּ אַפֶּה, טֶה רוֹג', true, 10);

-- קפה ואוכל — רמה 3
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_coffee_3', 'Pot să comand și pentru prietenul meu?', 'אפשר להזמין גם עבור חברי?', 'פּוֹט סֶה קוֹמַנְד שִׁי פֶּנְטְרוּ פְּרִיֶטֶנוּל מֶאוּ?', true, 1),
  ('ro_coffee_3', 'Ce recomandați din meniu?', 'מה אתם ממליצים מהתפריט?', 'צֶ׳ה רֶקוֹמַנְדַצִי דִין מֶנִיוּ?', true, 2),
  ('ro_coffee_3', 'Este fără gluten?', 'האם זה ללא גלוטן?', 'אֶסְטֶה פֶּרֶה גְּלוּטֶן?', true, 3),
  ('ro_coffee_3', 'Aș vrea ceva ușor de mâncat', 'הייתי רוצה משהו קל לאכילה', 'אַש בְּרֵאַה צ׳ֶבַה אוּשוֹר דֶה מִינְקַט', true, 4),
  ('ro_coffee_3', 'Aveți opțiuni vegetariene?', 'יש לכם אפשרויות צמחוניות?', 'אַבֶּצִי אוֹפְּצִיוּנִי וֶגֶטַרִיֶנֶה?', true, 5),
  ('ro_coffee_3', 'Cafeaua este prea fierbinte', 'הקפה חם מדי', 'קַפֶּה-אַוַה אֶסְטֶה פְּרֶאַה פִיֶרְבִּינְטֶה', true, 6),
  ('ro_coffee_3', 'Îmi place cafeaua cu lapte spumat', 'אני אוהב קפה עם חלב מוקצף', 'אִימִי פְּלַאצֶ׳ה קַפֶּה-אַוַה קוּ לַפְּטֶה סְפּוּמַט', true, 7),
  ('ro_coffee_3', 'Plătim separat, te rog', 'נשלם בנפרד, בבקשה', 'פְּלֶטִים סֶפַּרַט, טֶה רוֹג', true, 8);

-- ============================================================
-- VOCABULARY — RESTAURANT
-- ============================================================

-- מסעדה — רמה 1
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_restaurant_1', 'masă', 'שולחן', 'מַאסֶה', false, 1),
  ('ro_restaurant_1', 'meniu', 'תפריט', 'מֶנִיוּ', false, 2),
  ('ro_restaurant_1', 'chelner', 'מלצר', 'קֶלְנֶר', false, 3),
  ('ro_restaurant_1', 'notă', 'חשבון', 'נוֹטֶה', false, 4),
  ('ro_restaurant_1', 'supă', 'מרק', 'סוּפֶּה', false, 5),
  ('ro_restaurant_1', 'carne', 'בשר', 'קַרְנֶה', false, 6),
  ('ro_restaurant_1', 'pește', 'דג', 'פֶּשְׁטֶה', false, 7),
  ('ro_restaurant_1', 'salată', 'סלט', 'סַלַטֶה', false, 8),
  ('ro_restaurant_1', 'desert', 'קינוח', 'דֶסֶרְט', false, 9),
  ('ro_restaurant_1', 'vin', 'יין', 'בִּין', false, 10);

-- מסעדה — רמה 2
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_restaurant_2', 'O masă pentru doi, te rog', 'שולחן לשניים, בבקשה', 'אוֹ מַאסֶה פֶּנְטְרוּ דוֹי, טֶה רוֹג', true, 1),
  ('ro_restaurant_2', 'Aș dori să văd meniul', 'אני רוצה לראות את התפריט', 'אַש דוֹרִי סֶה וֶד מֶנִיוּל', true, 2),
  ('ro_restaurant_2', 'Ce aveți ca fel principal?', 'מה יש לכם כמנה עיקרית?', 'צֶ׳ה אַבֶּצִי קַה פֶל פְּרִינְצִיפַּל?', true, 3),
  ('ro_restaurant_2', 'Vreau steak bine făcut', 'אני רוצה סטייק עשוי היטב', 'בְּרֵאוּ סְטֶיְק בִּינֶה פֶּקוּט', true, 4),
  ('ro_restaurant_2', 'Nota, te rog', 'החשבון, בבקשה', 'נוֹטַה, טֶה רוֹג', true, 5),
  ('ro_restaurant_2', 'Aveți loc liber?', 'יש לכם מקום פנוי?', 'אַבֶּצִי לוֹק לִיבֶּר?', true, 6),
  ('ro_restaurant_2', 'Este foarte delicios', 'זה מאוד טעים', 'אֶסְטֶה פוֹאַרְטֶה דֶלִיצִ׳ִיוֹס', true, 7),
  ('ro_restaurant_2', 'Nu mânânc carne de porc', 'אני לא אוכל בשר חזיר', 'נוּ מֶנִינְק קַרְנֶה דֶה פּוֹרְק', true, 8),
  ('ro_restaurant_2', 'Vreau să fac o rezervare', 'אני רוצה להזמין מקום', 'בְּרֵאוּ סֶה פַּק אוֹ רֶזֶרְבַּרֶה', true, 9),
  ('ro_restaurant_2', 'Puteți aduce mai multă apă?', 'תוכלו להביא עוד מים?', 'פּוּטֶצִי אַדוּצֶ׳ה מַאי מוּלְטֶה אַפֶּה?', true, 10);

-- מסעדה — רמה 3
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_restaurant_3', 'Am o alergie la nuci', 'יש לי אלרגיה לאגוזים', 'אַם אוֹ אַלֶרְגִיֶה לַה נוּצִי', true, 1),
  ('ro_restaurant_3', 'Puteți pregăti fără gluten?', 'אפשר להכין ללא גלוטן?', 'פּוּטֶצִי פְּרֶגֶטִי פֶּרֶה גְּלוּטֶן?', true, 2),
  ('ro_restaurant_3', 'Vă rog să schimbați tacâmurile', 'בבקשה להחליף את הסכו"ם', 'בֶּה רוֹג סֶה סְקִימְבַּצִי טַקִימוּרִילֶה', true, 3),
  ('ro_restaurant_3', 'Mâncarea a fost excelentă, felicitări bucătarului', 'האוכל היה מעולה, תודה לשף', 'מִינְקַרֶה-אַה אַ פוֹסְט אֶקְסְצֶלֶנְטֶה', true, 4),
  ('ro_restaurant_3', 'Putem plăti cu cardul?', 'אפשר לשלם בכרטיס?', 'פּוּטֶם פְּלֶטִי קוּ קַרְדוּל?', true, 5),
  ('ro_restaurant_3', 'Aceasta este comanda greșită', 'זו הזמנה שגויה', 'אַצ׳ֶאַסְטַה אֶסְטֶה קוֹמַנְדַה גְּרֶשִׁיטֶה', true, 6),
  ('ro_restaurant_3', 'Aș dori să încerc specialitatea casei', 'הייתי רוצה לנסות את מנה הבית', 'אַש דוֹרִי סֶה אִינְצֶרְק סְפֶּצִ׳יַלִיטַטֶה קַאסֶי', true, 7),
  ('ro_restaurant_3', 'Este o masă pentru ocazii speciale', 'זה ארוחה לרגל אירוע מיוחד', 'אֶסְטֶה אוֹ מַאסֶה פֶּנְטְרוּ אוֹקַזִיִי סְפֶּצִ׳יַלֶה', true, 8);

-- ============================================================
-- VOCABULARY — SHOPPING
-- ============================================================

-- קניות — רמה 1
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_shopping_1', 'magazin', 'חנות', 'מַגַזִין', false, 1),
  ('ro_shopping_1', 'preț', 'מחיר', 'פְּרֶץ', false, 2),
  ('ro_shopping_1', 'bani', 'כסף', 'בַּנִי', false, 3),
  ('ro_shopping_1', 'ieftin', 'זול', 'יֶפְטִין', false, 4),
  ('ro_shopping_1', 'scump', 'יקר', 'סְקוּמְפּ', false, 5),
  ('ro_shopping_1', 'haine', 'בגדים', 'הַיְנֶה', false, 6),
  ('ro_shopping_1', 'pantofi', 'נעליים', 'פַּנְטוֹפִי', false, 7),
  ('ro_shopping_1', 'mărime', 'מידה', 'מֶרִימֶה', false, 8),
  ('ro_shopping_1', 'card', 'כרטיס אשראי', 'קַרְד', false, 9),
  ('ro_shopping_1', 'pungă', 'שקית', 'פּוּנְגֶה', false, 10);

-- קניות — רמה 2
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_shopping_2', 'Cât costă asta?', 'כמה זה עולה?', 'קִיט קוֹסְטֶה אַסְטַה?', true, 1),
  ('ro_shopping_2', 'Aveți o mărime mai mare?', 'יש לכם מידה גדולה יותר?', 'אַבֶּצִי אוֹ מֶרִימֶה מַאי מַרֶה?', true, 2),
  ('ro_shopping_2', 'Pot să încerc?', 'אני יכול לנסות?', 'פּוֹט סֶה אִינְצֶרְק?', true, 3),
  ('ro_shopping_2', 'Unde este casa de marcat?', 'איפה הקופה?', 'אוּנְדֶה אֶסְטֶה קַאסַה דֶה מַרְקַט?', true, 4),
  ('ro_shopping_2', 'Vreau să returnez asta', 'אני רוצה להחזיר את זה', 'בְּרֵאוּ סֶה רֶטוּרְנֶז אַסְטַה', true, 5),
  ('ro_shopping_2', 'Plătesc cu cardul', 'אני משלם בכרטיס', 'פְּלֶטֶסְק קוּ קַרְדוּל', true, 6),
  ('ro_shopping_2', 'Aveți reduceri?', 'יש לכם הנחות?', 'אַבֶּצִי רֶדוּצֶרִי?', true, 7),
  ('ro_shopping_2', 'Este în stoc?', 'האם יש במלאי?', 'אֶסְטֶה אִין סְטוֹק?', true, 8),
  ('ro_shopping_2', 'Îmi puteți face o pungă?', 'תוכלו לתת לי שקית?', 'אִימִי פּוּטֶצִי פַּצֶ׳ה אוֹ פּוּנְגֶה?', true, 9),
  ('ro_shopping_2', 'Caut o rochie pentru o nuntă', 'אני מחפש שמלה לחתונה', 'קַאוּט אוֹ רוֹקִ׳ה פֶּנְטְרוּ אוֹ נוּנְטֶה', true, 10);

-- קניות — רמה 3
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_shopping_3', 'Puteți face o reducere de preț?', 'אפשר לקבל הנחה במחיר?', 'פּוּטֶצִי פַּצֶ׳ה אוֹ רֶדוּצֶרֶה דֶה פְּרֶץ?', true, 1),
  ('ro_shopping_3', 'Care este politica de returnare?', 'מה מדיניות ההחזרות?', 'קַארֶה אֶסְטֶה פּוֹלִיטִיקַה דֶה רֶטוּרְנַרֶה?', true, 2),
  ('ro_shopping_3', 'Căutam ceva în stilul acesta', 'חיפשתי משהו בסגנון הזה', 'קֶאוּטַם צ׳ֶבַה אִין סְטִילוּל אַצ׳ֶסְטַה', true, 3),
  ('ro_shopping_3', 'Nu am primit restul corect', 'לא קיבלתי עודף נכון', 'נוּ אַם פְּרִימִיט רֶסְטוּל קוֹרֶקְט', true, 4),
  ('ro_shopping_3', 'Puteți înfășura ca cadou?', 'אפשר לעטוף כמתנה?', 'פּוּטֶצִי אִינְפֶּשוּרַה קַה קַדוֹוּ?', true, 5),
  ('ro_shopping_3', 'Produsul era defect la cumpărare', 'המוצר היה פגום בעת הקנייה', 'פְּרוֹדוּסוּל אֶרַה דֶפֶקְט לַה קוּמְפֶּרַרֶה', true, 6),
  ('ro_shopping_3', 'Există o garanție pentru acest produs?', 'יש אחריות על המוצר הזה?', 'אֶקְסִיסְטֶה אוֹ גַּרַנְצִיֶה פֶּנְטְרוּ אַצ׳ֶסְט פְּרוֹדוּס?', true, 7),
  ('ro_shopping_3', 'Aș vrea să compar prețurile', 'הייתי רוצה להשוות מחירים', 'אַש בְּרֵאַה סֶה קוֹמְפַּר פְּרֶצוּרִילֶה', true, 8);

-- ============================================================
-- VOCABULARY — DIRECTIONS
-- ============================================================

-- כיוונים — רמה 1
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_directions_1', 'stânga', 'שמאל', 'סְטִינְגַה', false, 1),
  ('ro_directions_1', 'dreapta', 'ימין', 'דְּרֶאַפְּטַה', false, 2),
  ('ro_directions_1', 'înainte', 'קדימה', 'אִינַאִינְטֶה', false, 3),
  ('ro_directions_1', 'înapoi', 'אחורה', 'אִינַפּוֹי', false, 4),
  ('ro_directions_1', 'stație', 'תחנה', 'סְטַצִ׳ִיֶה', false, 5),
  ('ro_directions_1', 'autobuz', 'אוטובוס', 'אַאוּטוֹבוּז', false, 6),
  ('ro_directions_1', 'taxi', 'מונית', 'טַקְסִי', false, 7),
  ('ro_directions_1', 'tren', 'רכבת', 'טְרֶן', false, 8),
  ('ro_directions_1', 'aeroport', 'שדה תעופה', 'אֶרוֹפּוֹרְט', false, 9),
  ('ro_directions_1', 'hotel', 'מלון', 'הוֹטֶל', false, 10);

-- כיוונים — רמה 2
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_directions_2', 'Unde este gara?', 'איפה תחנת הרכבת?', 'אוּנְדֶה אֶסְטֶה גַּרַה?', true, 1),
  ('ro_directions_2', 'Cum ajung la hotel?', 'איך אני מגיע למלון?', 'קוּם אַז׳וּנְג לַה הוֹטֶל?', true, 2),
  ('ro_directions_2', 'Este departe de aici?', 'האם זה רחוק מכאן?', 'אֶסְטֶה דֶפַּרְטֶה דֶה אַיצִ׳?', true, 3),
  ('ro_directions_2', 'Luați la dreapta la semafor', 'פנה ימינה בפנס', 'לוּאַצִי לַה דְּרֶאַפְּטַה לַה סֶמַפּוֹר', true, 4),
  ('ro_directions_2', 'Un bilet pentru Cluj, te rog', 'כרטיס לקלוז, בבקשה', 'אוּן בִּיְלֶט פֶּנְטְרוּ קְלוּז׳, טֶה רוֹג', true, 5),
  ('ro_directions_2', 'La ce oră pleacă autobuzul?', 'באיזו שעה האוטובוס יוצא?', 'לַה צ׳ֶה אוֹרֶה פְּלֶאַקֶה אַאוּטוֹבוּזוּל?', true, 6),
  ('ro_directions_2', 'Puteți chema un taxi?', 'תוכלו לקרוא למונית?', 'פּוּטֶצִי קֶמַה אוּן טַקְסִי?', true, 7),
  ('ro_directions_2', 'Mă pot urca în autobuz aici?', 'אני יכול לעלות על האוטובוס כאן?', 'מֶה פּוֹט אוּרְקַה אִין אַאוּטוֹבוּז אַיצִ׳?', true, 8),
  ('ro_directions_2', 'Mergeți drept înainte', 'לכו ישר קדימה', 'מֶרְגֶּצִי דְרֶפְּט אִינַאִינְטֶה', true, 9),
  ('ro_directions_2', 'Cât durează cu metroul?', 'כמה זמן לוקח ברכבת תחתית?', 'קִיט דוּרֶאזֶה קוּ מֶטְרוּל?', true, 10);

-- כיוונים — רמה 3
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_directions_3', 'M-am rătăcit, puteți să mă ajutați?', 'הלכתי לאיבוד, תוכלו לעזור לי?', 'מַם רֶטֶצִיט, פּוּטֶצִי סֶה מֶה אַז׳וּטַצִי?', true, 1),
  ('ro_directions_3', 'Există o hartă a orașului?', 'יש מפה של העיר?', 'אֶקְסִיסְטֶה אוֹ הַרְטֶה אַה אוֹרַשוּלוּי?', true, 2),
  ('ro_directions_3', 'Care autobuz merge spre centru?', 'איזה אוטובוס הולך למרכז?', 'קַארֶה אַאוּטוֹבוּז מֶרְגֶה סְפְּרֶה צ׳ֶנְטְרוּ?', true, 3),
  ('ro_directions_3', 'Vreau să închiriez o mașină', 'אני רוצה לשכור מכונית', 'בְּרֵאוּ סֶה אִינְקִירִיֶז אוֹ מַשִׁינֶה', true, 4),
  ('ro_directions_3', 'Este accesibil cu scaunul cu rotile?', 'האם נגיש לכסא גלגלים?', 'אֶסְטֶה אַקְצֶסִיבִּיל קוּ סְקַאוּנוּל קוּ רוֹטִילֶה?', true, 5),
  ('ro_directions_3', 'Trecerea de pietoni este la capătul străzii', 'מעבר החצייה בסוף הרחוב', 'טְרֶצֶרֶה-אַה דֶה פִּיֶטוֹנִי אֶסְטֶה לַה קַפֶּטוּל סְטְרֶזִי', true, 6),
  ('ro_directions_3', 'Cât costă o cursă până la aeroport?', 'כמה עולה נסיעה לשדה התעופה?', 'קִיט קוֹסְטֶה אוֹ קוּרְסֶה פִּינֶה לַה אֶרוֹפּוֹרְט?', true, 7),
  ('ro_directions_3', 'Trenul a întârziat cu o oră', 'הרכבת התעכבה בשעה', 'טְרֶנוּל אַה אִינְטִירְזִיַט קוּ אוֹ אוֹרֶה', true, 8);

-- ============================================================
-- VOCABULARY — NUMBERS
-- ============================================================

-- מספרים וזמן — רמה 1
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_numbers_1', 'unu', 'אחד', 'אוּנוּ', false, 1),
  ('ro_numbers_1', 'doi', 'שניים', 'דוֹי', false, 2),
  ('ro_numbers_1', 'trei', 'שלושה', 'טְרֵי', false, 3),
  ('ro_numbers_1', 'patru', 'ארבעה', 'פַּטְרוּ', false, 4),
  ('ro_numbers_1', 'cinci', 'חמישה', 'צִ׳ינְצִ׳י', false, 5),
  ('ro_numbers_1', 'șase', 'שישה', 'שַׁאסֶה', false, 6),
  ('ro_numbers_1', 'șapte', 'שבעה', 'שַׁפְּטֶה', false, 7),
  ('ro_numbers_1', 'opt', 'שמונה', 'אוֹפְּט', false, 8),
  ('ro_numbers_1', 'nouă', 'תשעה', 'נוֹוֶה', false, 9),
  ('ro_numbers_1', 'zece', 'עשרה', 'זֶצ׳ֶה', false, 10);

-- מספרים וזמן — רמה 2
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_numbers_2', 'Ce oră este?', 'כמה השעה?', 'צֶ׳ה אוֹרֶה אֶסְטֶה?', true, 1),
  ('ro_numbers_2', 'Este ora trei', 'השעה שלוש', 'אֶסְטֶה אוֹרַה טְרֵי', true, 2),
  ('ro_numbers_2', 'Sunt douăzeci de ani', 'יש עשרים שנים', 'סוּנְט דוֹוֶזֶצִי דֶה אַנִי', true, 3),
  ('ro_numbers_2', 'Costă cincizeci de lei', 'עולה חמישים לאי', 'קוֹסְטֶה צִ׳ינְצִ׳יזֶצִי דֶה לֵיי', true, 4),
  ('ro_numbers_2', 'Luni, marți, miercuri', 'שני, שלישי, רביעי', 'לוּנִי, מַרְצִי, מִיֶרְקוּרִי', true, 5),
  ('ro_numbers_2', 'În ianuarie', 'בינואר', 'אִין יַנוּאַרִיֶה', true, 6),
  ('ro_numbers_2', 'La ora șase seara', 'בשעה שש בערב', 'לַה אוֹרַה שַׁאסֶה סֶאַרַה', true, 7),
  ('ro_numbers_2', 'Mâine la prânz', 'מחר בצהריים', 'מִינֶה לַה פְּרִינְז', true, 8),
  ('ro_numbers_2', 'Astăzi este marți', 'היום יום שלישי', 'אַסְטֶזִי אֶסְטֶה מַרְצִי', true, 9),
  ('ro_numbers_2', 'Numărul meu de telefon este', 'מספר הטלפון שלי הוא', 'נוּמֶרוּל מֶאוּ דֶה טֶלֶפוֹן אֶסְטֶה', true, 10);

-- מספרים וזמן — רמה 3
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_numbers_3', 'Ne întâlnim la ora opt și jumătate', 'נפגש בשמונה וחצי', 'נֶה אִינְטִילְנִים לַה אוֹרַה אוֹפְּט שִׁי ז׳וּמֶטַטֶה', true, 1),
  ('ro_numbers_3', 'Rezervarea este pentru vineri seara', 'ההזמנה היא לערב שישי', 'רֶזֶרְבַּרֶה-אַה אֶסְטֶה פֶּנְטְרוּ בִּינֶרִי סֶאַרַה', true, 2),
  ('ro_numbers_3', 'Avem o întâlnire mâine dimineață', 'יש לנו פגישה מחר בבוקר', 'אַבֶּם אוֹ אִינְטִילְנִירֶה מִינֶה דִימִינֶאַצֶה', true, 3),
  ('ro_numbers_3', 'Câte zile rămâneți în București?', 'כמה ימים תישארו בבוקרשט?', 'קִיטֶה זִילֶה רֶמִינֶצִי אִין בּוּקוּרֶשְׁטִי?', true, 4),
  ('ro_numbers_3', 'Magazinul este deschis până la ora nouă', 'החנות פתוחה עד השעה תשע', 'מַגַזִינוּל אֶסְטֶה דֶסְקִיס פִּינֶה לַה אוֹרַה נוֹוֶה', true, 5),
  ('ro_numbers_3', 'Trenul pleacă în cinci minute', 'הרכבת יוצאת בעוד חמש דקות', 'טְרֶנוּל פְּלֶאַקֶה אִין צִ׳ינְצִ׳י מִינוּטֶה', true, 6),
  ('ro_numbers_3', 'Astăzi este data de douăzeci mai', 'היום התאריך הוא עשרים במאי', 'אַסְטֶזִי אֶסְטֶה דַטַה דֶה דוֹוֶזֶצִי מַאִי', true, 7),
  ('ro_numbers_3', 'Cheltuielile totale sunt de trei sute de lei', 'ההוצאות הכוללות הן שלוש מאות לאי', 'קֶלְטוּיֶלִילֶה טוֹטַלֶה סוּנְט דֶה טְרֵי סוּטֶה דֶה לֵיי', true, 8);

-- ============================================================
-- VOCABULARY — EMERGENCY
-- ============================================================

-- חירום — רמה 1
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_emergency_1', 'ajutor', 'עזרה', 'אַז׳וּטוֹר', false, 1),
  ('ro_emergency_1', 'doctor', 'רופא', 'דוֹקְטוֹר', false, 2),
  ('ro_emergency_1', 'spital', 'בית חולים', 'סְפִּיטַל', false, 3),
  ('ro_emergency_1', 'poliție', 'משטרה', 'פּוֹלִיצִיֶה', false, 4),
  ('ro_emergency_1', 'ambulanță', 'אמבולנס', 'אַמְבּוּלַנְצֶה', false, 5),
  ('ro_emergency_1', 'farmacist', 'רוקח', 'פַּרְמַצִ׳יסְט', false, 6),
  ('ro_emergency_1', 'durere', 'כאב', 'דוּרֶרֶה', false, 7),
  ('ro_emergency_1', 'foc', 'אש', 'פוֹק', false, 8),
  ('ro_emergency_1', 'pastilă', 'כדור תרופה', 'פַּסְטִילֶה', false, 9),
  ('ro_emergency_1', 'urgență', 'חירום', 'אוּרְגֶּנְצֶה', false, 10);

-- חירום — רמה 2
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_emergency_2', 'Chemați o ambulanță!', 'קראו לאמבולנס!', 'קֶמַצִי אוֹ אַמְבּוּלַנְצֶה!', true, 1),
  ('ro_emergency_2', 'Unde este cel mai apropiat spital?', 'איפה בית החולים הקרוב?', 'אוּנְדֶה אֶסְטֶה צ׳ֶל מַאי אַפְּרוֹפִּיַט סְפִּיטַל?', true, 2),
  ('ro_emergency_2', 'Am nevoie de un medic', 'אני צריך רופא', 'אַם נֶבוֹיֶה דֶה אוּן מֶדִיק', true, 3),
  ('ro_emergency_2', 'Sunt alergic la penicilină', 'אני אלרגי לפניצילין', 'סוּנְט אַלֶרְגִיק לַה פֶּנִיצִילִינֶה', true, 4),
  ('ro_emergency_2', 'Mă doare capul', 'כואבת לי הראש', 'מֶה דוֹאַרֶה קַפּוּל', true, 5),
  ('ro_emergency_2', 'Cineva m-a furat', 'מישהו גנב ממני', 'צִ׳ינֶבַה מַה פוּרַט', true, 6),
  ('ro_emergency_2', 'Aveți o farmacie aproape?', 'יש בית מרקחת קרוב?', 'אַבֶּצִי אוֹ פַּרְמַצִ׳ִיֶה אַפְּרוֹאַפֶּה?', true, 7),
  ('ro_emergency_2', 'Mi-am pierdut pașaportul', 'איבדתי את הדרכון', 'מִי-אַם פִּיֶרְדוּט פַּשַׁפּוֹרְטוּל', true, 8),
  ('ro_emergency_2', 'Sunați la 112!', 'התקשרו ל-112!', 'סוּנַצִי לַה אוּנוּ אוּנוּ דוֹי!', true, 9),
  ('ro_emergency_2', 'Nu mă simt bine', 'אני לא מרגיש טוב', 'נוּ מֶה סִימְט בִּינֶה', true, 10);

-- חירום — רמה 3
insert into vocabulary (level_id, target_text, he, translit, is_phrase, sort_order) values
  ('ro_emergency_3', 'Am o reacție alergică severă', 'יש לי תגובה אלרגית קשה', 'אַם אוֹ רֶאַקְצִיֶה אַלֶרְגִיקֶה סֶבֶרֶה', true, 1),
  ('ro_emergency_3', 'Iau aceste medicamente în mod regulat', 'אני לוקח תרופות אלו באופן קבוע', 'יַאוּ אַצ׳ֶסְטֶה מֶדִיקַמֶנְטֶה אִין מוֹד רֶגוּלַט', true, 2),
  ('ro_emergency_3', 'Am nevoie de o traducere urgentă', 'אני צריך תרגום דחוף', 'אַם נֶבוֹיֶה דֶה אוֹ טְרַדוּצֶרֶה אוּרְגֶּנְטֶה', true, 3),
  ('ro_emergency_3', 'Vă rog contactați ambasada israeliană', 'בבקשה צרו קשר עם השגרירות הישראלית', 'בֶּה רוֹג קוֹנְטַקְטַצִי אַמְבַּאסַדַה יִשְׂרְאֶלִיַאנֶה', true, 4),
  ('ro_emergency_3', 'Mașina mea s-a stricat pe drum', 'המכונית שלי התקלקלה בדרך', 'מַשִׁינַה מֶאַה סַה סְטְרִיקַט פֶּה דְרוּם', true, 5),
  ('ro_emergency_3', 'Am nevoie de o declarație pentru asigurare', 'אני צריך הצהרה לביטוח', 'אַם נֶבוֹיֶה דֶה אוֹ דֶקְלַרַצִיֶה פֶּנְטְרוּ אַסִיגוּרַרֶה', true, 6),
  ('ro_emergency_3', 'Soția mea are dureri de stomac puternice', 'לאשתי כאבי בטן חזקים', 'סוֹצִ׳יַה מֶאַה אַרֶה דוּרֶרִי דֶה סְטוֹמַק פּוּטֶרְנִיצֶה', true, 7),
  ('ro_emergency_3', 'Pot să vorbesc cu un medic de urgență?', 'אפשר לדבר עם רופא חירום?', 'פּוֹט סֶה בוֹרְבֶּסְק קוּ אוּן מֶדִיק דֶה אוּרְגֶּנְצֶה?', true, 8);
