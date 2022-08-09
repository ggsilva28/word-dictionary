import { Component, Input, OnInit } from '@angular/core';

//API
import { UserFavoriteApiService } from '../../api/user-favorite-api.service';
import { AuthApiService } from '../../api/auth-api.service';
import { WordsApiService } from 'src/app/api/words-api.service';

//Services
import { EventService } from '../../services/event.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})

export class FavoriteComponent implements OnInit {

  @Input() word: any = null;
  @Input() fav: boolean = false;

  public loadingFav: boolean = false;

  constructor(
    public userFavoriteApi: UserFavoriteApiService,
    public authApi: AuthApiService,
    public event: EventService,
    public wordsApi: WordsApiService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  async favorite(): Promise<void> {
    this.loadingFav = true;
    const response = await this.userFavoriteApi.addUserFavorite(this.word);
    this.loadingFav = false;

    if (response.isOk) {
      await this.wordsApi.updateOnWordAPIHistory(this.word, { isFavorite: true });

      this.event.publish('word-list:fav-update');
      this.event.publish('word-detail:update');
      this.toastr.success('Word added to favorites');
      return;
    }

    this.toastr.error('Error adding word to favorites');
  }

  async unfavorite(): Promise<void> {
    this.loadingFav = true;
    const response = await this.userFavoriteApi.deleteUserFavorite(this.word);
    this.loadingFav = false;

    if (response.isOk) {
      await this.wordsApi.updateOnWordAPIHistory(this.word, { isFavorite: false });

      this.event.publish('word-list:fav-update');
      this.event.publish('word-detail:update');
      this.toastr.success('Word removed from favorites');
      return;
    }

    this.toastr.error('Error removing word from favorites');
  }
}
