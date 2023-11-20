import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post_service';
import { Post, Comment } from '../post.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BackEndService } from '../back-end.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent {
  form!: FormGroup;
  index: number = 0;
  editMode = false;
  constructor(private postservice: PostService, private router: Router,
    private actRoute: ActivatedRoute, private backEndService :BackEndService) {}

  ngOnInit(): void {

    let title = '';
    let description = '';
    let imgPath = '';


    this.actRoute.params.subscribe((params: Params)=> {
      if(params['index']){
        console.log(params['index']);
        this.index = params['index'];

        const post = this.postservice.getSpecPost (this.index);
        
        title = post.title;
        description = post.description;
        imgPath = post.imgPath;
        this.editMode = true;


      }
    }
    );


    this.form = new FormGroup({
      title: new FormControl(title, [Validators.required]),
      imgPath: new FormControl(imgPath, [Validators.required]),
      description: new FormControl(description, [Validators.required])
      
    })

  }
  onSubmit() {
    const title = this.form.value.title;
    const imgPath = this.form.value.imgPath;
    const description = this.form.value.description;
    const author = this.form.value.author;
    const numberOfLikes = this.form.value.numberOfLikes;

let comments: Comment[] = [];
if (this.editMode) {
  comments = this.postservice.getSpecPost(this.index).comments;
}
const post: Post = new Post(title, imgPath, description, author , new Date(), 0, comments);

    


      if(this.editMode==true){
        this.postservice.updatePost(this.index, post)
        this.backEndService.saveData();
      }
      else {
        this.postservice.addPost(post);
        this.backEndService.saveData();
      }
   

    this.router.navigate(['post-list']);
  }
// onSubmit() {
//   const title = this.form.value.title; // Default empty string if null
//   const imgPath = this.form.value.imgPath; // Default empty string if null
//   const description = this.form.value.description; // Default empty string if null
//   const numberoflikes = this.form.value.numberoflikes;

//   let comments: string[] = [];
//   if (this.editMode) {
//     comments = this.postservice.getSpecPost(this.index).comments;
//   }

//   const post: Post = new Post(this.postservice.getSpecPost(this.index). title, imgPath, description, '', new Date(), 0, comments);

//   if(this.editMode == true){
//     this.postservice.updatePost(this.index, post)
//     this.backEndService.saveData();
//   }
//   else{
//     this.postservice.addPost(post);
//     this.backEndService.saveData();
//   }

//   this.router.navigate(['post-list']);
// }
  
} 