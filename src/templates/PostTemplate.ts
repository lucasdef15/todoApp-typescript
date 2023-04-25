import FullPosts from '../model/FullPost';

interface DOMArticle {
  section: HTMLElement;
  clear(): void;
  render(fullPost: FullPosts): void;
}

export default class PostTemplate implements DOMArticle {
  static instance: PostTemplate = new PostTemplate();

  section: HTMLElement;

  private constructor() {
    this.section = document.getElementById('postsItems') as HTMLElement;
  }

  clear(): void {
    this.section.innerHTML = '';
  }

  render(fullPost: FullPosts): void {
    this.clear();

    fullPost.posts.forEach((post) => {
      const article = document.createElement('article') as HTMLElement;
      article.className = 'post';

      const h3 = document.createElement('h3') as HTMLHeadingElement;
      h3.textContent = post.title;
      article.append(h3);

      const p = document.createElement('p') as HTMLParagraphElement;
      p.textContent = post.body;
      article.append(p);

      this.section.append(article);
    });
  }
}
