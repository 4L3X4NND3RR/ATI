import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Commentary } from 'src/app/model/commentary';
import { CommentaryView } from 'src/app/model/commentary-view';
import { User } from 'src/app/model/user';
import { CommentaryService } from 'src/app/services/commentary.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.css'],
})
export class CommentaryComponent implements OnInit {
  commentaryForm: FormGroup;
  commentaries: CommentaryView[] = [];
  submited = false;

  constructor(
    private commentaryService: CommentaryService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.commentaryForm = this.formBuilder.group({
      commentary_desc: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.commentaryService.getCommentaries().subscribe((c) => {
      this.commentaries = c;
    });
  }

  onSubmit(): void {
    if (this.loginService.checkLoged()) {
      this.submited = true;
      if (this.commentaryForm.valid) {
        const userString = localStorage.getItem('user');
        if (!(userString === null)) {
          const commentary = new Commentary();
          const user: User = JSON.parse(userString) as User;
          commentary.id_user = user.id_user;
          commentary.commentary_date = new Date();
          commentary.commentary_desc = this.commentaryForm.get(
            'commentary_desc'
          )?.value;
          this.commentaryService
            .createCommentary(commentary)
            .then((res) => {
              if (res.success) {
                Swal.fire({
                  icon: 'success',
                  title: 'Información',
                  text: 'Comentario registrado exitosamente',
                }).then((result: any) => {
                  if (result) {
                    const commentaryView = new CommentaryView();
                    commentaryView.primer_nombre = user.primer_nombre;
                    commentaryView.segundo_nombre = user.segundo_nombre;
                    commentaryView.primer_apellido = user.primer_apellido;
                    commentaryView.segundo_apellido = user.segundo_apellido;
                    commentaryView.commentary_date = commentary.commentary_date;
                    commentaryView.commentary_desc = commentary.commentary_desc;
                    this.commentaries.push(commentaryView);
                    this.commentaryForm.reset();
                  }
                });
              }
            })
            .catch(() =>
              Swal.fire({
                icon: 'error',
                title: 'oopps...',
                text: 'parece que no subio nada',
              })
            );
        }
      }
    } else {
      this.router.navigate(['/login']);
    }
    this.submited = false;
  }
}
