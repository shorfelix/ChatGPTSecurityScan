import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Prompt {
  text: string;
}

interface GeneratedText {
  generated_text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatgpt-clone';
  promptText: string = '';
  generatedText: string = '';

  constructor(private http: HttpClient) {}

  generateText() {
    const prompt: Prompt = { text: this.promptText };
    this.http.post<GeneratedText>('http://localhost:8000/generate_text', prompt).subscribe(
      (data) => {
        this.generatedText = data.generated_text;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
