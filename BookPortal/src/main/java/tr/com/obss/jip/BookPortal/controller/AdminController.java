package tr.com.obss.jip.BookPortal.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.jip.BookPortal.dto.*;
import tr.com.obss.jip.BookPortal.entity.*;
import tr.com.obss.jip.BookPortal.service.AdminService;
import tr.com.obss.jip.BookPortal.service.UserService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/admin") // admin ekranı için
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/books")
    public ResponseEntity<List<Book>> getBooks() {
        return ResponseEntity.ok(adminService.getAllBooks());
    }

    @GetMapping("/authors")
    public ResponseEntity<List<Author>> getAuthors() {
        return ResponseEntity.ok(adminService.getAllAuthors());
    }



    @GetMapping("/users/{username}") // search user
    public ResponseEntity<User> getUser(@PathVariable(name = "username") String username) {
        return ResponseEntity.ok(adminService.findByUsername(username));
    }

    @GetMapping("/books/{title}") // search book
    public ResponseEntity<Book> getBook(@PathVariable(name = "title") String title) {
        return ResponseEntity.ok(adminService.findByTitle(title));
    }

    @GetMapping("/authors/{name}") // search author
    public ResponseEntity<Author> getAuthor(@PathVariable(name = "name") String name) {
        return ResponseEntity.ok(adminService.findByName(name));
    }



    /*
    @GetMapping("/users/{userID}") // search user
    public ResponseEntity<User> getUser(@PathVariable(name = "userID") long id) {
        return ResponseEntity.ok(adminService.findById(id));
    }

    @GetMapping("/books/{bookID}") // search book
    public ResponseEntity<Book> getBook(@PathVariable(name = "bookID") long id) {
        return ResponseEntity.ok(adminService.findById2(id));
    }

    @GetMapping("/authors/{autID}") // search author
    public ResponseEntity<Author> getAuthor(@PathVariable(name = "autID") long id) {
        return ResponseEntity.ok(adminService.findById3(id));
    }
    */


    @PostMapping("/users") // post isteğini karşılar (yeni kullanıcıyı kaydeder)
    public ResponseEntity<User> addUser(@Valid @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(adminService.addUser(userDTO));
    }

    @PostMapping("/books") // post isteğini karşılar (yeni kitabı kaydeder)
    public ResponseEntity<Book> addBook(@Valid @RequestBody BookDTO bookDTO) {
        return ResponseEntity.ok(adminService.addBook(bookDTO));
    }

    @PostMapping("/authors") // post isteğini karşılar (yeni yazarı kaydeder)
    public ResponseEntity<Author> addAuthor(@Valid @RequestBody AuthorDTO authorDTO) {
        return ResponseEntity.ok(adminService.addAuthor(authorDTO));
    }

    @PutMapping("/users/{userID}") // put isteğini karşılar (girilen id'deki kullanıcıyı güncelle)
    public ResponseEntity<User> updateUser(@PathVariable(name = "userID") long id, @Valid @RequestBody UserUpdateDTO userUpdateDTO) {
        return ResponseEntity.ok(adminService.updateUser(id, userUpdateDTO));
    }

    @PutMapping("/books/{bookID}") // put isteğini karşılar (girilen id'deki kitabı güncelle)
    public ResponseEntity<Book> updateUser(@PathVariable(name = "bookID") long id, @Valid @RequestBody BookUpdateDTO bookUpdateDTO) {
        return ResponseEntity.ok(adminService.updateBook(id, bookUpdateDTO));
    }

    @PutMapping("/authors/{autID}") // put isteğini karşılar (girilen id'deki yazarı güncelle)
    public ResponseEntity<Author> updateUser(@PathVariable(name = "autID") long id, @Valid @RequestBody AuthorUpdateDTO authorUpdateDTO) {
        return ResponseEntity.ok(adminService.updateAuthor(id, authorUpdateDTO));
    }

    @DeleteMapping("/users/{userID}") // delete isteğini karşılar (girilen id'deki kullanıcıyı remove)
    public ResponseEntity<User> removeUser(@PathVariable(name = "userID") long id) {
        return ResponseEntity.ok(adminService.removeUser(id));
    }

    @DeleteMapping("/books/{bookID}") // delete isteğini karşılar (girilen id'deki kitabı remove)
    public ResponseEntity<Book> removeBook(@PathVariable(name = "bookID") long id) {
        return ResponseEntity.ok(adminService.removeBook(id));
    }

    @DeleteMapping("/authors/{autID}") // delete isteğini karşılar (girilen id'deki yazarı remove)
    public ResponseEntity<Author> removeAuthor(@PathVariable(name = "autID") long id) {
        return ResponseEntity.ok(adminService.removeAuthor(id));
    }

}
