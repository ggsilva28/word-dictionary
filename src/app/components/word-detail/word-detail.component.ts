import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

//API
import { WordsApiService } from '../../api/words-api.service';

//Services
import { EventService } from '../../services/event.service';

//Interfaces
import { IWord } from '../../interfaces/word';

//Swiper
import SwiperCore, { Pagination } from "swiper";
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.scss'],
})

export class WordDetailComponent implements OnInit {

  public word: string = '';
  public wordData?: IWord;
  public loading: boolean = true;
  public error: boolean = false;

  constructor(
    public wordsApi: WordsApiService,
    public event: EventService,
    public dialogRef: MatDialogRef<WordDetailComponent>
  ) {
    this.event.subscribe('word-detail:show', (word: string) => {
      this.word = word;
      console.log(word)
      this.getWord();
    });

    this.event.subscribe('word-detail:update', () => {
      this.getWord();
    })
  }

  ngOnInit(): void {
  }

  async getWord(): Promise<void> {
    this.error = false;
    this.wordData = undefined;
    this.loading = true;
    const response = await this.wordsApi.getWord(this.word);
    this.loading = false;

    this.wordData = response.data;
    if (!response.isOk) {
      this.error = true;
    }

  }

  getPhonetics() {
    return this.wordData?.phonetics.map((phonetic: any): any => {
      if (phonetic.text) {
        return {
          text: phonetic.text,
          audio: phonetic.audio || null
        }
      }
    })
  }

  getDefinition(def: any): string {
    return def[0].definition;
  }

  prev(): void {
    this.event.publish('word-detail:prev');
  }

  next(): void {
    this.event.publish('word-detail:next');
  }

  close(){
    this.dialogRef.close();
  }
}
