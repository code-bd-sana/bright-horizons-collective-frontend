type FigmaRasterAsset = {
  src: string;
  width: number;
  height: number;
  figmaImageNodeIds: readonly string[];
};

export const figmaExploreImages = {
  activities: {
    stacking: {
      src: '/figma/explore/activity-sorting.png',
      width: 736,
      height: 1104,
      figmaImageNodeIds: [
        '1125:14372',
        '1125:14497',
        '1125:14622',
        '1125:14691',
        '1125:14722',
        '1125:14753',
        '1125:14784',
      ],
    },
    blocks: {
      src: '/figma/explore/activity-blocks.png',
      width: 800,
      height: 800,
      figmaImageNodeIds: ['1125:14403', '1125:14528', '1125:14653'],
    },
    outdoor: {
      src: '/figma/explore/activity-outdoor.png',
      width: 358,
      height: 500,
      figmaImageNodeIds: ['1125:14434', '1125:14465', '1125:14559', '1125:14590'],
    },
  },
  resources: {
    parentEducation: {
      src: '/figma/explore/resource-parent.png',
      width: 736,
      height: 1008,
      figmaImageNodeIds: ['1125:14896', '1125:14985', '1125:15079', '1125:15151', '1125:15173'],
    },
    milestones: {
      src: '/figma/explore/resource-milestones.png',
      width: 640,
      height: 640,
      figmaImageNodeIds: ['1125:14918', '1125:15007', '1125:15101'],
    },
    printable: {
      src: '/figma/explore/resource-printable.png',
      width: 736,
      height: 1104,
      figmaImageNodeIds: ['1125:14940', '1125:15029', '1125:15123'],
    },
    guides: {
      src: '/figma/explore/resource-guides.png',
      width: 736,
      height: 1349,
      figmaImageNodeIds: ['1125:14962', '1125:15051'],
    },
  },
  therapyToys: {
    camera: {
      src: '/figma/explore/toy-camera.png',
      width: 1024,
      height: 708,
      figmaImageNodeIds: ['1125:15294', '1125:15513', '1125:15548', '1125:15583'],
    },
    superhero: {
      src: '/figma/explore/toy-superhero.png',
      width: 1024,
      height: 577,
      figmaImageNodeIds: ['1125:15329'],
    },
    crafts: {
      src: '/figma/explore/toy-crafts.png',
      width: 626,
      height: 939,
      figmaImageNodeIds: ['1125:15366'],
    },
    bubbles: {
      src: '/figma/explore/toy-bubbles.png',
      width: 769,
      height: 1024,
      figmaImageNodeIds: ['1125:15401'],
    },
    friends: {
      src: '/figma/explore/toy-friends.png',
      width: 683,
      height: 1024,
      figmaImageNodeIds: ['1125:15437'],
    },
    blocks: {
      src: '/figma/explore/toy-blocks.png',
      width: 768,
      height: 1024,
      figmaImageNodeIds: ['1125:15472'],
    },
  },
} as const satisfies Record<string, Record<string, FigmaRasterAsset>>;

export const figmaExploreUiAssets = {
  activity: {
    mask: '/figma/explore/activity-mask.svg',
    bookmark: '/figma/explore/activity-bookmark.svg',
    bookmarkSaved: '/figma/explore/activity-bookmark-saved.svg',
    clock: '/figma/explore/activity-clock.svg',
  },
  resource: {
    mask: '/figma/explore/resource-mask.svg',
    printableMask: '/figma/explore/printable-mask.svg',
    bookmark: '/figma/explore/resource-bookmark.svg',
    bookmarkSaved: '/figma/explore/resource-bookmark-saved.svg',
    arrow: '/figma/explore/resource-arrow.svg',
    download: '/figma/explore/resource-download.svg',
  },
  therapyToy: {
    bookmark: '/figma/explore/toy-bookmark.svg',
    bookmarkSaved: '/figma/explore/toy-bookmark-saved.svg',
    arrow: '/figma/explore/toy-arrow.svg',
    savedSectionArrow: '/figma/explore/toy-arrow-saved.svg',
  },
  newsletter: {
    glow: '/figma/explore/newsletter-glow.svg',
    top: '/figma/explore/newsletter-top.svg',
    right: '/figma/explore/newsletter-right.svg',
    left: '/figma/explore/newsletter-left.svg',
  },
} as const;
