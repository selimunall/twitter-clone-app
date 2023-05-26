import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  tweets = [
    {
      id: '1',
      content:
        "Benim Kandil'deki teröristlerle görüştüğüme dair kasetler olduğunu söyledin. Ey Erdoğan, sen nasıl bir Müslümansın! Böyle bir görüşmeye dair elinde uydurma ve montaj olmayan gerçek bir kaset var da bunu yayınlayamıyorsan sen büyük bir yalancısın, müfterisin demektir.",
      likedBy: [],
      retweetBy: [],
      commentedBy: [],
      createdAt: '',
      by: {
        id: '2',
        name: 'Kemal Kılıçdaroğlu',
        username: '2',
        profileURL:
          'https://pbs.twimg.com/profile_images/1653841629248204800/Xvn6OeCV_bigger.jpg',
      },
    },
    {
      id: '1',
      content:
        "Benim Kandil'deki teröristlerle görüştüğüme dair kasetler olduğunu söyledin. Ey Erdoğan, sen nasıl bir Müslümansın! Böyle bir görüşmeye dair elinde uydurma ve montaj olmayan gerçek bir kaset var da bunu yayınlayamıyorsan sen büyük bir yalancısın, müfterisin demektir.",
      likedBy: [],
      retweetBy: [],
      commentedBy: [],
      createdAt: '',
      by: {
        id: '2',
        name: 'Kemal Kılıçdaroğlu',
        username: '2',
        profileURL:
          'https://pbs.twimg.com/profile_images/1627637135372177409/2AhWxuyW_bigger.jpg',
      },
    },
  ];
  LoginIn() {}
}
