import { Component, Input, OnInit } from '@angular/core';

//API
import { WordsApiService } from '../../api/words-api.service';

//Services
import { EventService } from '../../services/event.service';

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

  public words: string[] = [];
  public page = 1;
  public loading: boolean = false;
  public selectedWord: ISelectedWord = {
    word: '',
    index: 0
  }

  constructor(
    public wordsApi: WordsApiService,
    public event: EventService,
  ) {
    this.event.subscribe('word-detail:prev', () => {
      const word = this.words[this.selectedWord.index - 1];
      if (word) {
        this.showDetails(word, this.selectedWord.index - 1);
      }
    })

    this.event.subscribe('word-detail:next', () => {
      const word = this.words[this.selectedWord.index + 1];
      if (word) {
        this.showDetails(word, this.selectedWord.index + 1);
      }
    })
  }

  ngOnInit(): void {
    this.getWords();
  }

  ngOnChanges() {
    console.log('change')
    this.words = [];
    this.getWords();
  }

  getData() {
    switch (this.getFrom) {
      case 'all':
        return this.wordsApi.get(244, this.page);
        break;
      case 'favorites':
        return [];
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

    console.log(response)

    if (response.isOk) {

      if (this.page === 1) {
        this.words = response.data.results;
        this.selectedWord = { word: this.words[0], index: 0 };
        this.showDetails(this.words[0], 0);
      } else {
        this.words = this.words.concat(response.data.results);
      }
    }
  }

  loadNewPage(e: any) {
    this.page++;
    this.getWords();
  }

  showDetails(word: string, index: number) {
    this.selectedWord = {
      word: word,
      index: index
    }

    this.event.publish('word-detail:show', word);
  }
}
