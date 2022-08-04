import { Component, OnInit } from '@angular/core';

//API
import { WordsApiService } from 'src/app/api/words-api.service';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss']
})
export class WordsListComponent implements OnInit {

  public words: string[] = [];
  public page = 1;
  public loading: boolean = false;

  constructor(
    private wordsApi: WordsApiService
  ) { }

  ngOnInit(): void {
    this.getWords();
  }

  async getWords() {
    this.loading = true;
    const response = await this.wordsApi.get(244, this.page);
    this.loading = false;

    if (response.isOk) {

      if (this.page === 1) {
        this.words = response.data.results;
      }      else {
        this.words = this.words.concat(response.data.results);
      }

    }
  }

  loadNewPage(e: any) {
    this.page++;
    this.getWords();
  }

}
