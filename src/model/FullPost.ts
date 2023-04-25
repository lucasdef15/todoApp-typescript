import PostItem from './PostItem';

interface Posts {
  posts: PostItem[];
  load(): void;
  save(): void;
  addPost(postObj: PostItem): void;
}

export default class FullPosts implements Posts {
  static instance: FullPosts = new FullPosts();

  private constructor(private _posts: PostItem[] = []) {}

  get posts(): PostItem[] {
    return this._posts;
  }

  load(): void {
    const storedPosts: null | string = localStorage.getItem('myPosts');
    if (typeof storedPosts !== 'string') return;

    const parsedList: { _id: number; _title: string; _body: string }[] =
      JSON.parse(storedPosts);

    parsedList.forEach((postObj) => {
      const newPost = new PostItem(postObj._id, postObj._title, postObj._body);
      FullPosts.instance.addPost(newPost);
    });
  }

  save(): void {
    localStorage.setItem('myPosts', JSON.stringify(this._posts));
  }

  addPost(postObj: PostItem): void {
    this._posts.push(postObj);
    this.save();
  }
}
