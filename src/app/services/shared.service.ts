import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private slides: {
    id: number;
    title: string;
    description: string;
    image: string;
    route: string;
  }[] = [
    {
      id: 1,
      title: 'Restaurant',
      description:
        'An order platform for a restaurant/pizzeria, comprensive of menu, orders operations and delivery options.',
      image: 'assets/idea/restaurant.png',
      route: 'restaurant',
    },
    {
      id: 2,
      title: 'Task Management',
      description:
        'A Task management application where you can write down task, change them state, assign them to someone, delete them and so on.',
      image: 'assets/idea/task.png',
      route: 'task',
    },
    {
      id: 3,
      title: 'Fruit Shop',
      description:
        'An high quality online fruit shop. You can read about the company, explore the catalogue and make orders.',
      image: 'assets/idea/fruit.png',
      route: 'fruit',
    },
    {
      id: 4,
      title: 'E-commerce',
      description: 'E-commerce. Search, find and buy what you want.',
      image: 'assets/idea/ecommerce.png',
      route: 'ecommerce',
    },
    {
      id: 5,
      title: 'Showroom',
      description: "Only luxury cars here. Reserve or buy your favourite card. It's easy.",
      image: 'assets/idea/showroom.png',
      route: 'showroom',
    },
    {
      id: 6,
      title: 'Bank account',
      description:
        'An interface where you can monitor your bank account, you can also reserv appointments, send money and make other operations',
      image: 'assets/idea/bank.png',
      route: 'bank',
    },
    {
      id: 7,
      title: 'Crypto Graphs',
      description: 'Online application where you can observe and analyze live crypto graphs.',
      image: 'assets/idea/crypto.png',
      route: 'crypto',
    },
    {
      id: 8,
      title: 'Snake game',
      description: 'Classic snake game, have fun and play with keyboard!',
      image: 'assets/idea/snake.png',
      route: 'snake',
    },
    {
      id: 8,
      title: 'Three.js',
      description: 'Explore some of the numerous Three.js features and tricks.',
      image: 'assets/idea/three.jpg',
      route: 'three',
    },
    {
      id: 9,
      title: 'Tools',
      description:
        'A section where i use some of the tools from primeng, angular material and other external libraries.',
      image: 'assets/idea/tools.png',
      route: 'tools',
    },
    {
      id: 10,
      title: 'Informations',
      description:
        'A readme.md of this application. I provide you general informations about technologies used, features and use cases of this website.',
      image: 'assets/idea/info.png',
      route: 'info',
    },
    {
      id: 11,
      title: 'About me',
      description:
        'A more personal section, where you can read about me, my studies, my passions and how i spend my life.',
      image: 'assets/idea/about.png',
      route: 'about',
    },
    {
      id: 12,
      title: 'Error route',
      description:
        'A specific wrong route to show the error component, activated in case the desired route doesn\'t match with declared routes.',
      image: 'assets/idea/wrong.jpg',
      route: 'wrong',
    }
  ];

  getSlides(): {
    id: number;
    title: string;
    description: string;
    image: string;
    route: string;
  }[] {
    return this.slides;
  }
}
