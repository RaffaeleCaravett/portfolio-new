import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-idea',
  imports: [],
  templateUrl: './idea.html',
  styleUrl: './idea.scss',
})
export class IdeaComponent implements OnInit {
  protected slides: { id: number; title: string; description: string; image: string }[] = [];

  ngOnInit(): void {
    this.slides = [
      {
        id: 1,
        title: 'Restaurant',
        description:
          'An order platform for a restaurant/pizzeria, comprensive of menu, orders operations and delivery options.',
        image: 'assets/idea/restaurant.png',
      },
      {
        id: 2,
        title: 'Task Management',
        description:
          'A Task management application where you can write down task, change them state, assign them to someone, delete them and so on.',
        image: 'assets/idea/task.png',
      },
      {
        id: 3,
        title: 'Fruit Shop',
        description:
          'An high quality online fruit shop. You can read about the company, explore the catalogue and make orders.',
        image: 'assets/idea/fruit.png',
      },
      {
        id: 4,
        title: 'E-commerce',
        description: 'E-commerce. Search, find and buy what you want.',
        image: 'assets/idea/ecommerce.png',
      },
      {
        id: 5,
        title: 'Showroom',
        description: "Only luxury cars here. Reserve or buy your favourite card. It's easy.",
        image: 'assets/idea/showroom.png',
      },
      {
        id: 6,
        title: 'Bank account',
        description:
          'An interface where you can monitor your bank account, you can also reserv appointments, send money and make other operations',
        image: 'assets/idea/bank.png',
      },
      {
        id: 7,
        title: 'Crypto Graphs',
        description: 'Online application where you can observe and analyze live crypto graphs.',
        image: 'assets/idea/crypto.png',
      },
      {
        id: 8,
        title: 'Snake game',
        description: 'Classic snake game, have fun and play with keyboard!',
        image: 'assets/idea/snake.png',
      },
      {
        id: 8,
        title: 'Three.js',
        description: 'Explore some of the numerous Three.js features and tricks.',
        image: 'assets/idea/three.jpg',
      },
      {
        id: 9,
        title: 'About me',
        description: 'A more personal section, where you can read about me, my studies, my passions and how i spend my life.',
        image: 'assets/idea/about.png',
      }
    ];
  }
}
