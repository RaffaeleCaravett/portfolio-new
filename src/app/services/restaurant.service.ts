import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  protected restaurantApi: string = 'https://fakerestaurantapi.runasp.net/api/Restaurant/';
  private httpClient: HttpClient = inject(HttpClient);
  protected menu: {
    menuVoice: string;
    items: { nome: string; prezzo: number; ingredienti: string[] }[];
  }[] = [
    {
      menuVoice: 'Drinks',
      items: [
        {
          nome: 'Coca Cola',
          prezzo: 2.5,
          ingredienti: [
            'Acqua carbonata',
            'Zucchero',
            'Colorante caramello',
            'Acido fosforico',
            'Caffeina',
          ],
        },
        {
          nome: 'Fanta',
          prezzo: 2.5,
          ingredienti: [
            'Acqua carbonata',
            'Zucchero',
            'Succo di arancia',
            'Acido citrico',
            'Colorante',
          ],
        },
        {
          nome: 'Acqua Naturale',
          prezzo: 1.0,
          ingredienti: ['Acqua'],
        },
        {
          nome: 'Succo di Arancia',
          prezzo: 2.0,
          ingredienti: ['Succo di arancia', 'Acqua', 'Zucchero'],
        },
        {
          nome: 'Sprite',
          prezzo: 2.5,
          ingredienti: ['Acqua carbonata', 'Zucchero', 'Limone', 'Acido citrico', 'Caffeina'],
        },
        {
          nome: 'Acqua Frizzante',
          prezzo: 1.0,
          ingredienti: ['Acqua', 'Anidride carbonica'],
        },
        {
          nome: 'Coca Cola Zero',
          prezzo: 2.5,
          ingredienti: ['Acqua carbonata', 'Edulcorante', 'Acido fosforico', 'Caffeina'],
        },
        {
          nome: 'Lemonade',
          prezzo: 2.3,
          ingredienti: ['Acqua', 'Succo di limone', 'Zucchero'],
        },
        {
          nome: 'Fanta Limonata',
          prezzo: 2.4,
          ingredienti: ['Acqua carbonata', 'Succo di limone', 'Zucchero', 'Acido citrico'],
        },
        {
          nome: 'Tè Freddo alla Pesca',
          prezzo: 2.2,
          ingredienti: ['Acqua', 'Tè nero', 'Succo di pesca', 'Zucchero'],
        },
      ],
    },
    {
      menuVoice: 'Entries',
      items: [
        {
          nome: 'Spaghetti alla Carbonara',
          prezzo: 8.0,
          ingredienti: ['Spaghetti', 'Guanciale', 'Uova', 'Pecorino Romano', 'Pepe nero'],
        },
        {
          nome: "Penne all'Arrabbiata",
          prezzo: 7.5,
          ingredienti: ['Penne', 'Pomodoro', 'Aglio', 'Peperoncino', "Olio d'oliva"],
        },
        {
          nome: 'Risotto ai Funghi',
          prezzo: 9.0,
          ingredienti: [
            'Riso Arborio',
            'Funghi porcini',
            'Brodo vegetale',
            'Parmigiano',
            'Burro',
            'Vino bianco',
          ],
        },
        {
          nome: 'Lasagne alla Bolognese',
          prezzo: 10.0,
          ingredienti: ['Lasagne', 'Carne macinata di manzo', 'Pomodoro', 'Bechamel', 'Parmigiano'],
        },
        {
          nome: 'Pasta al Pesto Genovese',
          prezzo: 8.5,
          ingredienti: ['Pasta', 'Basilico', 'Aglio', 'Pinoli', 'Parmigiano', "Olio d'oliva"],
        },
        {
          nome: 'Tagliatelle al Ragù di Cinghiale',
          prezzo: 12.0,
          ingredienti: [
            'Tagliatelle',
            'Carne di cinghiale',
            'Pomodoro',
            'Aglio',
            'Vino rosso',
            'Rosmarino',
          ],
        },
        {
          nome: 'Gnocchi di Patate alla Sorrentina',
          prezzo: 9.5,
          ingredienti: ['Gnocchi di patate', 'Mozzarella', 'Pomodoro', 'Basilico', 'Parmigiano'],
        },
        {
          nome: 'Risotto alla Milanese',
          prezzo: 9.0,
          ingredienti: ['Riso', 'Zafferano', 'Brodo di carne', 'Burro', 'Parmigiano'],
        },
        {
          nome: 'Ravioli Ricotta e Spinaci',
          prezzo: 11.0,
          ingredienti: ['Ravioli', 'Ricotta', 'Spinaci', 'Parmigiano', 'Burro'],
        },
        {
          nome: 'Orecchiette con Cime di Rapa',
          prezzo: 9.0,
          ingredienti: ['Orecchiette', 'Cime di rapa', 'Aglio', 'Peperoncino', "Olio d'oliva"],
        },
      ],
    },
    {
      menuVoice: 'Seconds',
      items: [
        {
          nome: 'Cotoletta alla Milanese',
          prezzo: 12.0,
          ingredienti: ['Cotoletta di vitello', 'Farina', 'Uovo', 'Pangrattato', 'Burro'],
        },
        {
          nome: 'Bistecca alla Fiorentina',
          prezzo: 18.0,
          ingredienti: ['Bistecca di manzo', "Olio d'oliva", 'Aglio', 'Rosmarino'],
        },
        {
          nome: 'Branzino al Forno',
          prezzo: 15.0,
          ingredienti: ['Branzino', 'Limone', 'Aglio', 'Rosmarino', "Olio d'oliva"],
        },
        {
          nome: 'Filetto di Manzo',
          prezzo: 20.0,
          ingredienti: ['Filetto di manzo', 'Burro', 'Rosmarino', 'Aglio'],
        },
        {
          nome: 'Tagliata di Manzo',
          prezzo: 16.0,
          ingredienti: ['Tagliata di manzo', 'Rucola', 'Pomodorini', 'Parmigiano'],
        },
        {
          nome: 'Pollo alla Cacciatora',
          prezzo: 13.5,
          ingredienti: ['Pollo', 'Pomodoro', 'Vino rosso', 'Rosmarino', 'Aglio'],
        },
        {
          nome: 'Scaloppine al Limone',
          prezzo: 14.0,
          ingredienti: ['Scaloppine di vitello', 'Limone', 'Burro', 'Farina'],
        },
        {
          nome: 'Arista di Maiale al Forno',
          prezzo: 14.5,
          ingredienti: ['Arista di maiale', 'Aglio', 'Rosmarino', "Olio d'oliva"],
        },
        {
          nome: 'Costolette di Agnello',
          prezzo: 18.0,
          ingredienti: ['Costolette di agnello', 'Aglio', 'Rosmarino', 'Burro'],
        },
        {
          nome: 'Stufato di Manzo',
          prezzo: 15.5,
          ingredienti: ['Manzo', 'Pomodoro', 'Cipolla', 'Vino rosso', 'Rosmarino'],
        },
      ],
    },
    {
      menuVoice: 'Breads',
      items: [
        {
          nome: 'Panino con Pollo Grigliato',
          prezzo: 6.5,
          ingredienti: ['Pollo', 'Panino', 'Lattuga', 'Pomodoro', 'Maionese'],
        },
        {
          nome: 'Panino con Prosciutto e Mozzarella',
          prezzo: 5.5,
          ingredienti: ['Prosciutto crudo', 'Mozzarella', 'Panino', 'Lattuga', 'Pomodoro'],
        },
        {
          nome: 'Panino con Veggie Burger',
          prezzo: 7.0,
          ingredienti: ['Veggie burger', 'Panino', 'Lattuga', 'Pomodoro', 'Maionese'],
        },
        {
          nome: 'Panino con Salame e Formaggio',
          prezzo: 6.0,
          ingredienti: ['Salame', 'Formaggio', 'Panino', 'Lattuga'],
        },
        {
          nome: 'Panino con Tonno e Uova',
          prezzo: 6.5,
          ingredienti: ['Tonno', 'Uova sode', 'Panino', 'Lattuga', 'Maionese'],
        },
      ],
    },
    {
      menuVoice: 'Sweet',
      items: [
        {
          nome: 'Tiramisu',
          prezzo: 4.5,
          ingredienti: ['Mascarpone', 'Uova', 'Savoiardi', 'Caffè', 'Cacao amaro', 'Zucchero'],
        },
        {
          nome: 'Cannoli Siciliani',
          prezzo: 5.0,
          ingredienti: ['Cialda di cannolo', 'Ricotta', 'Zucchero', 'Canditi', 'Cioccolato'],
        },
        {
          nome: 'Cheesecake ai Frutti di Bosco',
          prezzo: 5.5,
          ingredienti: [
            'Formaggio spalmabile',
            'Biscotti secchi',
            'Burro',
            'Frutti di bosco',
            'Zucchero',
          ],
        },
        {
          nome: 'Profiteroles',
          prezzo: 4.0,
          ingredienti: ['Pasta choux', 'Crema pasticcera', 'Cioccolato', 'Zucchero'],
        },
        {
          nome: 'Panna Cotta',
          prezzo: 4.5,
          ingredienti: ['Panna', 'Zucchero', 'Gelatina', 'Vaniglia', 'Frutti di bosco'],
        },
        {
          nome: 'Zabaglione',
          prezzo: 4.0,
          ingredienti: ['Uova', 'Zucchero', 'Marsala'],
        },
        {
          nome: 'Crostata di Marmellata',
          prezzo: 3.5,
          ingredienti: ['Pasta frolla', 'Marmellata di frutta', 'Zucchero'],
        },
        {
          nome: 'Strudel di Mele',
          prezzo: 5.0,
          ingredienti: ['Mele', 'Pasta sfoglia', 'Zucchero', 'Cannella', 'Uvetta'],
        },
        {
          nome: 'Gelato alla Vaniglia',
          prezzo: 3.0,
          ingredienti: ['Latte', 'Zucchero', 'Vaniglia'],
        },
        {
          nome: 'Torta al Cioccolato',
          prezzo: 4.5,
          ingredienti: ['Cioccolato fondente', 'Farina', 'Burro', 'Zucchero', 'Uova'],
        },
        {
          nome: 'Torta di Ricotta',
          prezzo: 5.0,
          ingredienti: ['Ricotta', 'Farina', 'Zucchero', 'Uova', 'Scorza di limone'],
        },
        {
          nome: 'Clafoutis di Ciliegie',
          prezzo: 4.5,
          ingredienti: ['Ciliegie', 'Farina', 'Uova', 'Latte', 'Zucchero', 'Vaniglia'],
        },
        {
          nome: 'Mousse al Cioccolato',
          prezzo: 4.0,
          ingredienti: ['Cioccolato fondente', 'Panna', 'Zucchero', 'Uova'],
        },
        {
          nome: 'Gelato al Pistacchio',
          prezzo: 3.5,
          ingredienti: ['Latte', 'Pistacchi', 'Zucchero'],
        },
        {
          nome: 'Coppetta di Frutta Fresca',
          prezzo: 4.0,
          ingredienti: ['Frutta fresca di stagione', 'Zucchero', 'Limone'],
        },
        {
          nome: 'Bavarese al Limone',
          prezzo: 4.5,
          ingredienti: ['Panna', 'Zucchero', 'Gelatina', 'Succo di limone', 'Vaniglia'],
        },
        {
          nome: 'Budino al Cioccolato',
          prezzo: 4.0,
          ingredienti: ['Cioccolato fondente', 'Latte', 'Zucchero', 'Amido di mais', 'Uova'],
        },
        {
          nome: 'Torta di Mele',
          prezzo: 4.0,
          ingredienti: ['Mele', 'Farina', 'Zucchero', 'Burro', 'Uova', 'Lievito'],
        },
        {
          nome: 'Tiramisu al Pistacchio',
          prezzo: 5.5,
          ingredienti: ['Mascarpone', 'Uova', 'Savoiardi', 'Caffè', 'Pistacchi', 'Zucchero'],
        },
        {
          nome: 'Sacher Torte',
          prezzo: 5.0,
          ingredienti: [
            'Cioccolato fondente',
            'Farina',
            'Marmellata di albicocche',
            'Zucchero',
            'Uova',
          ],
        },
        {
          nome: 'Frittelle di Mele',
          prezzo: 4.0,
          ingredienti: ['Mele', 'Farina', 'Zucchero', 'Uova', 'Lievito', 'Cannella'],
        },
        {
          nome: 'Biscotti al Burro',
          prezzo: 3.0,
          ingredienti: ['Farina', 'Burro', 'Zucchero', 'Uova', 'Vaniglia'],
        },
      ],
    },
  ];
  getMenu(): {
    menuVoice: string;
    items: { nome: string; prezzo: number; ingredienti: string[]; note?: string }[];
  }[] {
    return this.menu;
  }
}
