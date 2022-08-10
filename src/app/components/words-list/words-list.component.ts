import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//API
import { WordsApiService } from '../../api/words-api.service';
import { UserFavoriteApiService } from './../../api/user-favorite-api.service';

//Services
import { EventService } from '../../services/event.service';

//Components
import { WordDetailComponent } from './../word-detail/word-detail.component';

interface ISelectedWord {
  word: string,
  index: number
}

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss']
})
export class WordsListComponent implements OnInit {

  @Input() getFrom: string = '';

  @HostListener('window:resize', ['$event'])
  public isMobile = () => window.innerWidth < 998;
  public words: string[] = [];
  public page = 0;
  public loading: boolean = false;
  public selectedWord: ISelectedWord = {
    word: '',
    index: 0
  }

  constructor(
    public wordsApi: WordsApiService,
    public userFavoriteApi: UserFavoriteApiService,
    public event: EventService,
    public route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
  ) {
    this.event.subscribe('word-detail:prev', () => {
      const word = this.words[this.selectedWord.index - 1];
      if (word) {
        this.updateDetails(word, this.selectedWord.index - 1);
      }
    })

    this.event.subscribe('word-detail:next', () => {
      const word = this.words[this.selectedWord.index + 1];
      if (word) {
        this.updateDetails(word, this.selectedWord.index + 1);
      }
    })

    this.event.subscribe('word-list:fav-update', () => {
      if (this.getFrom === 'favorites') {
        this.getWords();
      }
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getWords();
  }

  ngOnChanges() {
    this.selectedWord.word = this.route.snapshot.paramMap.get('word') || '';
    this.words = [];
    this.getWords();
  }

  getData() {
    switch (this.getFrom) {
      case 'all':
        return this.wordsApi.get(244, this.page);
        break;
      case 'favorites':
        return this.userFavoriteApi.getUserFavorite(this.page, 244);
        break;
      case 'history':
        return this.wordsApi.getHistory();
        break;
      default:
        return this.wordsApi.get(244, this.page);
        break;
    }
  }

  async getWords() {
    this.loading = true;
    const response = await this.getData();
    this.loading = false;

    if (response.isOk) {

      if (this.page === 0) {
        this.words = response.data.results;

        if (!this.selectedWord.word) {
          this.selectedWord = { word: this.words[0], index: 0 };
        } else {
          this.selectedWord.index = this.words.indexOf(this.selectedWord.word);
        }

        this.updateDetails(this.selectedWord.word, this.selectedWord.index);
      } else {
        this.words = this.words.concat(response.data.results);
      }
    }
  }

  loadNewPage(e: any) {
    this.page++;
    this.getWords();
  }

  updateDetails(word: string, index: number) {
    this.selectedWord = {
      word: word,
      index: index
    }

    //Update URL
    this.event.publish('word-detail:show', word);
    this.router.navigate([`/home/${word}`]);
  }

  async openDetails(word: string, index: number) {

    if (this.isMobile())
      this.dialog.open(WordDetailComponent);

    this.updateDetails(word, index);
  }

}
