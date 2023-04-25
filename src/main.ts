import './styles/style.css';
import PostItem from './model/PostItem';
import FullPosts from './model/FullPost';
import PostTemplate from './templates/PostTemplate';

const initApp = (): void => {
  const fullPosts = FullPosts.instance;
  const template = PostTemplate.instance;

  const postEntryForm = document.getElementById(
    'postEntryForm'
  ) as HTMLFormElement;

  postEntryForm.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();

    const postId: number = fullPosts.posts.length
      ? fullPosts.posts[fullPosts.posts.length - 1].id + 1
      : 1;

    const input = document.getElementById('postTitle') as HTMLInputElement;
    const newEntryTitle: string = input.value.trim();

    const textArea = document.getElementById('postBody') as HTMLTextAreaElement;
    const newEntryBody: string = textArea.value.trim();

    // if (!newEntryTitle.length || !newEntryBody) return;

    const newPost = new PostItem(postId, newEntryTitle, newEntryBody);

    fullPosts.addPost(newPost);

    template.render(fullPosts);
  });

  fullPosts.load();
  template.render(fullPosts);
};

document.addEventListener('DOMContentLoaded', initApp);
