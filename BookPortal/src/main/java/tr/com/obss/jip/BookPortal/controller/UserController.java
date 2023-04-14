package tr.com.obss.jip.BookPortal.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.jip.BookPortal.dto.AuthorDTO;
import tr.com.obss.jip.BookPortal.dto.BookByCloseProjection;
import tr.com.obss.jip.BookPortal.dto.BookDTO;
import tr.com.obss.jip.BookPortal.entity.Author;
import tr.com.obss.jip.BookPortal.entity.Book;
import tr.com.obss.jip.BookPortal.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/user") // user ekranı için
public class UserController {

    // --> Constructor injection
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    // --> Constructor injection


    @GetMapping("/books") // bütün kitapları listele
    //@PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<List<BookDTO>> getBooks() {
        return ResponseEntity.ok(userService.getAllBooks());
    }

    //@GetMapping("/books/by-title") // search book
    @GetMapping("/books/{title}") // search book
    public ResponseEntity<BookDTO> getBook(@PathVariable(name = "title") String title) {
        title = title.replace("-", " "); // replace - with space

        return ResponseEntity.ok(userService.findByTitle(title));
    }

    @GetMapping("/books/fav/{userName}") // favori kitapları listele
    //@PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<List<BookByCloseProjection>> getFavBooks(@PathVariable(name = "userName") String userName) {
        return ResponseEntity.ok(userService.getFavBooks(userName));
    }

    @GetMapping("/books/read/{userName}") // okunmuş kitapları listele)
    //@PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<List<BookByCloseProjection>> getReadBooks(@PathVariable(name = "userName") String userName) {
        return ResponseEntity.ok(userService.getReadBooks(userName));
    }


    @PutMapping("/books/fav/{userName}")
    public ResponseEntity<List<BookByCloseProjection>> updateFav(@PathVariable(name = "userName") String userName, @RequestParam(name = "bookTitle") String title) {
        userService.addFav(userName, title);

        return ResponseEntity.ok(userService.getFavBooks(userName)); // get the updated list
    }

    @PutMapping("/books/read/{userName}")
    public ResponseEntity<List<BookByCloseProjection>> updateRead(@PathVariable(name = "userName") String userName, @RequestParam(name = "bookTitle") String title) {
        userService.addRead(userName, title);

        return ResponseEntity.ok(userService.getReadBooks(userName)); // get the updated list
    }


    @DeleteMapping("/books/fav/{userName}")
    public ResponseEntity<List<BookByCloseProjection>> removeFav(@PathVariable(name = "userName") String userName, @RequestParam(name = "bookTitle") String title) {
        userService.removeFav(userName, title); // remove book
        return ResponseEntity.ok(userService.getFavBooks(userName)); // get the updated list
    }

    @DeleteMapping("/books/read/{userName}")
    public ResponseEntity<List<BookByCloseProjection>> removeRead(@PathVariable(name = "userName") String userName, @RequestParam(name = "bookTitle") String title) {
        userService.removeRead(userName, title); // remove book
        return ResponseEntity.ok(userService.getReadBooks(userName)); // get the updated list

    }

    // ADDITIONAL PARTS
    @GetMapping("/authors") // bütün kitapları listele
    //@PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<List<Author>> getAuthors() {
        return ResponseEntity.ok(userService.getAllAuthors());
    }

    //@GetMapping("/books/by-title") // search book
    @GetMapping("/authors/{authorName}") // search book
    public ResponseEntity<AuthorDTO> getAuthor(@PathVariable(name = "authorName") String authorName) {
        return ResponseEntity.ok(userService.findByName(authorName));
    }

}
