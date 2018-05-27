\c daysail_db

INSERT INTO users
  (username, email, password)
  VALUES
  ('Alan' ,'a@ga.co', 'test'),
  ('Barry','b@ga.co', 'test'),
  ('Chele','c@ga.co', 'test'),
  ('David','d@go.co', 'test'),
  ('Edine','e@go.co', 'test'),
  ('Harry','h@ga.co', 'test'),
  ('Mandy','m@ga.co', 'test'),
  ('Nicho','n@ga.co', 'test'),
  ('Peter','p@ga.co', 'test')
  ;

  INSERT INTO boats
  (creator_id, photo, description, location)
  VALUES

  ( 'Alan',
    'https://i.imgur.com/757bSHR.jpg',
    'Framboise - Baba 30" - 1985',
    'Shelter Island, NY'),

  ( 'Chele',
    'https://www.cruisingworld.com/sites/cruisingworld.com/files/styles/opengraph_1_91x1/public/images/2017/09/crw0917_rv1_elan001.jpg?itok=kFf-zRQd',
    'Athena - Elan GTS 60" - 2015',
    'Jersey City, NJ'),

  ( 'Harry',
    'http://swiftsureyachts.com/wp-content/uploads/2018/04/DSC_7988-1015x672.jpg',
    'Veritas - Tashiba 40" - 1990',
    'City Island, NY'),

  ( 'Nicho',
    'http://www.elan-yachts.com/img/w1200-p1/wp-content/uploads/2017/01/ELAN_e5_ext_34.jpg',
    'Rosani - Elan 5 44" - 2010',
    'Manhattan, NY'),

  ( 'Peter',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Under_the_Bridge_%2822806746913%29.jpg/1280px-Under_the_Bridge_%2822806746913%29.jpg',
    'Dreamscape - Tayana 37" - 1989',
    'Liberty Landing, NJ')
    ;

INSERT INTO boat_faves
  (username, boat_id)
  VALUES

  ( 'Alan',   1),
  ( 'Chele',  1),
  ( 'David',  1),
  ( 'David',  2),
  ( 'David',  3),
  ( 'David',  4),
  ( 'David',  5),
  ( 'Edine',  5)
  ;

