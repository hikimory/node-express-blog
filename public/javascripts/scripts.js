$((function(){function o(){$("form.login p.error, form.register p.error").remove(),$("form.login input, form.register input").removeClass("error")}function t(o){$(".register h2").after('<p class="error">'+o.error+"</p>"),o.fields&&o.fields.forEach((function(o){$("input[name="+o+"]").addClass("error")}))}function r(o){$(".login h2").after('<p class="error">'+o.error+"</p>"),o.fields&&o.fields.forEach((function(o){$("input[name="+o+"]").addClass("error")}))}$(".switch-button").on("click",(function(t){t.preventDefault(),$("input").val(""),o(),$(".login").toggle(),$(".register").toggle()})),$("form.login input, form.register input").on("focus",(function(){o()})),$(".register-button").on("click",(function(r){r.preventDefault(),o();const e={login:$("#register-login").val(),password:$("#register-password").val(),passwordConfirm:$("#register-password-confirm").val()};if(e.login&&e.password&&e.passwordConfirm)/^[a-zA-Z0-9]+$/.test(e.login)?e.login.length<3||e.login.length>16?t({error:"Длина логина от 3 до 16 символов!",fields:["login"]}):e.password!==e.passwordConfirm?t({error:"Пароли не совпадают!",fields:["password","passwordConfirm"]}):e.password.length<5?t({error:"Минимальная длина пароля 5 символов!",fields:["password"]}):$.ajax({type:"POST",data:JSON.stringify(e),contentType:"application/json",url:"/api/auth/register"}).done((function(o){o.ok?$(location).attr("href","/"):t(o)})):t({error:"Только латинские буквы и цифры!",fields:["login"]});else{const o=[];e.login||o.push("login"),e.password||o.push("password"),e.passwordConfirm||o.push("passwordConfirm"),t({error:"Все поля должны быть заполнены!",fields:o})}})),$(".login-button").on("click",(function(t){t.preventDefault(),o();const e={login:$("#login-login").val(),password:$("#login-password").val()};if(e.login&&e.password)$.ajax({type:"POST",data:JSON.stringify(e),contentType:"application/json",url:"/api/auth/login"}).done((function(o){o.ok?$(location).attr("href","/"):r(o)}));else{const o=[];e.login||o.push("login"),e.password||o.push("password"),r({error:"Все поля должны быть заполнены!",fields:o})}}))})),$((function(){function o(){$(".post-form p.error").remove(),$(".post-form input, #post-body").removeClass("error")}function t(o){$(".post-form h2").after('<p class="error">'+o.error+"</p>"),o.fields&&o.fields.forEach((function(o){$("#post-"+o).addClass("error")}))}$(".post-form input, #post-body").on("focus",(function(){o()})),$(".publish-button, .save-button").on("click",(function(r){r.preventDefault(),o();let e="save-button"===$(this).attr("class").split(" ")[0];const n={title:$("#post-title").val(),body:$("#post-body").val(),isDraft:e,postId:$("#post-id").val()};if(n.title&&n.body)n.title.length<3||n.title.length>64?t({error:"Длина заголовка от 3 до 64 символов!",fields:["title"]}):n.body.replace(/<\/?[^>]+(>|$)/g,"").length<3?t({error:"Текст не менее 3х символов!",fields:["body"]}):$.ajax({type:"POST",data:JSON.stringify(n),contentType:"application/json",url:"/post/add"}).done((function(o){console.log(o),o.ok?e?$(location).attr("href","/post/edit/"+o.post.id):$(location).attr("href","/posts/"+o.post.url):t(o)}));else{const o=[];n.title||o.push("title"),n.body||o.push("body"),t({error:"Все поля должны быть заполнены!",fields:o})}})),$("#fileinfo").on("submit",(function(o){o.preventDefault();const t=new FormData(this);$.ajax({type:"POST",url:"/upload/image",data:t,processData:!1,contentType:!1,success:o=>console.log(o),error:o=>console.log(o)})}))})),$((function(){let o,t;function r(t){void 0===t.error&&(t.error="Неизвестная ошибка!"),$(o).prepend('<p class="error">'+t.error+"</p>")}function e(r,e){if($(".reply").show(),o&&o.remove(),t=null,o=$(".comment").clone(!0,!0),r)o.find(".cancel").hide(),o.appendTo(".comment-list");else{const r=$(e).parent();t=r.attr("id"),$(e).after(o)}o.css({display:"flex"})}e(!0),$(".reply").on("click",(function(){e(!1,this),$(this).hide()})),$("form.comment .cancel").on("click",(function(t){t.preventDefault(),o.remove(),e(!0)})),$("form.comment .send").on("click",(function(n){n.preventDefault();const s={post:$(".comments").attr("id"),body:o.find("textarea").val(),parent:t};s.body?$.ajax({type:"POST",data:JSON.stringify(s),contentType:"application/json",url:"/comment/add"}).done((function(t){if(console.log(t),t.ok){const r='<ul><li style="background-color:#ffffe0;"><div class="head"><a href="/users/'+t.login+'">'+t.login+'</a><spam class="date">Только что</spam></div>'+t.body+"</li></ul>";$(o).after(r),e(!0)}else r(t)})):r({error:"Коментарий пуст !"})}))}));