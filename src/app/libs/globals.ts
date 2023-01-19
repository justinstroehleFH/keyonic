import cryptonic from 'cryptonic';

export const icons = [
  'accessibility',
  'airplane',
  'beer',
  'business',
  'card',
  'cart',
  'chatbubbles',
  'earth',
  'game-controller',
  'ribbon',
  'rocket',
  'school',
  'wifi',
];

export const labels = [
  {
    id: '1',
    labelName: 'Shopping',
    icon: 'cart',
  },
  {
    id: '2',
    labelName: 'Work',
    icon: 'business',
  },
  {
    id: '3',
    labelName: 'Uni',
    icon: 'school',
  },
];

export const passwords = [
  {
    id: '1',
    title: 'FHV',
    username: 'nto69',
    password: cryptonic.encrypt('1234'),
    url: 'www.ilias/fhv.at',
    label: ['3'],
  },
  {
    id: '2',
    title: 'ZARA',
    username: 'Shopper3000',
    password: cryptonic.encrypt('WasLacostedDieWelt'),
    url: 'www.zara.at',
    label: ['1'],
  },
  {
    id: '3',
    title: 'GIT',
    username: 'gitlover420',
    password: cryptonic.encrypt('mainBranchAlways'),
    url: 'www.github.com',
    label: ['2', '1'],
  },
  {
    id: '4',
    title: 'ProTask',
    username: 'PT_JST',
    password: cryptonic.encrypt('SAP4LIFE'),
    url: 'www.protask.eu',
    label: ['2'],
  },
];
