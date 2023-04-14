package tr.com.obss.jip.BookPortal.service;

import org.springframework.context.ApplicationContext;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tr.com.obss.jip.BookPortal.dto.*;
import tr.com.obss.jip.BookPortal.entity.Author;
import tr.com.obss.jip.BookPortal.entity.Book;
import tr.com.obss.jip.BookPortal.entity.User;
import tr.com.obss.jip.BookPortal.model.MyUserDetails;
import tr.com.obss.jip.BookPortal.repository.AuthorRepository;
import tr.com.obss.jip.BookPortal.repository.BookRepository;
import tr.com.obss.jip.BookPortal.repository.RoleRepository;
import tr.com.obss.jip.BookPortal.repository.UserRepository;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

@Service
public class AdminService {

    private final UserRepository userRepository;

    private final BookRepository bookRepository;

    private final RoleRepository roleRepository;

    private final AuthorRepository authorRepository;

    private final PasswordEncoder encoder;


    public AdminService(UserRepository userRepository, BookRepository bookRepository, RoleRepository roleRepository, AuthorRepository authorRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.roleRepository = roleRepository;
        this.authorRepository = authorRepository;
        this.encoder = encoder;
    }

    public List<User> getAllUsers() { // DB'den bütün kullanıcıları döner
        return userRepository.findAll();
    }

    public List<Book> getAllBooks() { // pagination yap
        return bookRepository.findAll();
    }

    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }


    public User findByUsername(String username) {
        var userOpt = userRepository.findByUsername(username); // optional. Empty or filled

        return userOpt.orElseThrow(() -> {
            throw new IllegalArgumentException("User not found");
        });
    }

    public Book findByTitle(String title) {
        var bookOpt = bookRepository.findByTitle(title); // optional. Empty or filled

        return bookOpt.orElseThrow(() -> {
            throw new IllegalArgumentException("Book not found");
        });
    }


    public Author findByName(String name) {
        var authorOpt = authorRepository.findByName(name); // optional. Empty or filled

        return authorOpt.orElseThrow(() -> {
            throw new IllegalArgumentException("Author not found");
        });
    }


    public User addUser(UserDTO userDTO) {
        // aynı isimde kullanıcı yok ise eklemeye izin ver
        if (!userRepository.existsByUsername(userDTO.getUserName())) {
            var user = new User();
            user.setUsername(userDTO.getUserName());
            user.setPassword(encoder.encode(userDTO.getPassword()));
            var userRoleOpt = roleRepository.findByName("ROLE_USER");
            userRoleOpt.ifPresent((userRole) -> {
                user.setRoles(Set.of(userRoleOpt.get()));
            });

            return userRepository.save(user);
        } else {
            throw new DataIntegrityViolationException("This username is already taken");
        }
    }


    public Book addBook(BookDTO bookDTO) { // BURAYA Bİ DAHA BAK. Bİ TANE KOMBİNASYONDA ÇALIŞMIYO
        // isim ve tipi var olan gir. yazarı olmayan bir yazar gir patlıyor

        if (!bookRepository.existsByTitleAndTypeAndAuthorName(bookDTO.getTitle(),
                bookDTO.getType(), bookDTO.getAuthorName())) {
            // Yazar daha önce sisteme eklenmemiş ise yazar eklenir
            if (!authorRepository.existsByName(bookDTO.getAuthorName())) {
                var newAuthorDTO = new AuthorDTO();
                newAuthorDTO.setName(bookDTO.getAuthorName());
                this.addAuthor(newAuthorDTO);
            }
            var author = authorRepository.findByName(bookDTO.getAuthorName());
            var book = new Book();
            book.setTitle(bookDTO.getTitle());
            book.setType(bookDTO.getType());
            book.setAuthor(author.get());

            return bookRepository.save(book);
        } else {
            throw new DataIntegrityViolationException("This book has already exist");
        }
    }


    public Author addAuthor(AuthorDTO authorDTO) {
        if (!authorRepository.existsByName(authorDTO.getName())) {
            var author = new Author();
            author.setName(authorDTO.getName());

            return authorRepository.save(author);
        } else {
            throw new DataIntegrityViolationException("This author has already exist");
        }
    }

    // FIND BY ID'LER İÇİN GENERIC BİR YAPI DÜŞÜN
    public User findById(long id) { // DB'den ilgili id'deki kullanıcıyı döner
        var userOpt = userRepository.findById(id); // optional. Empty or filled

        return userOpt.orElseThrow(() -> {
            throw new IllegalArgumentException("User not found");
        });
    }

    public Book findById2(long id) { // DB'den ilgili id'deki kitabı döner
        var bookOpt = bookRepository.findById(id); // optional. Empty or filled

        return bookOpt.orElseThrow(() -> {
            throw new IllegalArgumentException("Book not found");
        });
    }

    public Author findById3(long id) { // DB'den ilgili id'deki yazarı döner
        var authorOpt = authorRepository.findById(id); // optional. Empty or filled

        return authorOpt.orElseThrow(() -> {
            throw new IllegalArgumentException("Author not found");
        });
    }

    public User updateUser(long id, UserUpdateDTO userUpdateDTO) { // DB'den ilgili id'deki kullanıcıyı günceller
        var tempUser = userRepository.findByUsername(userUpdateDTO.getUserName());

        if (!tempUser.isPresent()) {
            var user = this.findById(id); // optional. Empty or filled
            user.setUsername(userUpdateDTO.getUserName());
            return userRepository.save(user);
        } else
            throw new DataIntegrityViolationException("Duplicate user found");

    }

    public Book updateBook(long id, BookUpdateDTO bookUpdateDTO) { // DB'den ilgili id'deki kullanıcıyı günceller

        var tempBook = bookRepository.findByTitleAndType(bookUpdateDTO.getTitle(), bookUpdateDTO.getType());

        if (!tempBook.isPresent()) {
            var book = bookRepository.findById(id).get(); // optional. Empty or filled
            book.setTitle(bookUpdateDTO.getTitle());
            book.setType(bookUpdateDTO.getType());

            return bookRepository.save(book);
        } else
            throw new DataIntegrityViolationException("Duplicate book found");


        // YAZAR ADINI DEĞİŞTİRMEK İÇİN DROPDOWN YAP SİSTEMDE OLAN YAZARLARDAN SEÇEBİLSİN KULLANICI
        // OLMAYAN YAZARI GİRİNCE EKLEME İŞİNE GİRME BOŞUNA
        /*
        if (authorRepository.existsByName(bookUpdateDTO.getAuthorName())) { // varsa sadece adını değiştir
            var author = authorRepository.findByName(bookUpdateDTO.getAuthorName());
            author.get().setName(bookUpdateDTO.getAuthorName());
            var updatedAuthor = authorRepository.save(author.get());
            book.get().setAuthor(updatedAuthor);
        }
        */


    }

    public Author updateAuthor(long id, AuthorUpdateDTO authorUpdateDTO) { // DB'den ilgili id'deki kullanıcıyı günceller

        var tempAuthor = authorRepository.findByName(authorUpdateDTO.getName());

        if (!tempAuthor.isPresent()) {
            var author = authorRepository.findById(id); // optional. Empty or filled

            author.get().setName(authorUpdateDTO.getName());
            return authorRepository.save(author.get());
        } else
            throw new DataIntegrityViolationException("Duplicate author found");

    }

    public User removeUser(long id) { // DB'den ilgili id'deki kullanıcıyı remove
        var user = this.findById(id);
        user.setActive(!user.isActive()); // mevcutta true ise false yapar, false ise true
        return userRepository.save(user);
    }

    public Book removeBook(long id) { // DB'den ilgili id'deki kullanıcıyı remove
        var book = bookRepository.findById(id); // optional. Empty or filled
        book.get().setActive(!book.get().isActive()); // mevcutta true ise false yapar, false ise true
        return bookRepository.save(book.get());
    }

    public Author removeAuthor(long id) { // DB'den ilgili id'deki kullanıcıyı remove
        var author = authorRepository.findById(id); // optional. Empty or filled
        author.get().setActive(!author.get().isActive()); // mevcutta true ise false yapar, false ise true

        // yazar remove olunca kitaplarını da remove yap
        Set<Book> books = author.get().getBooks();
        Iterator itr = books.iterator();

        while (itr.hasNext()) {
            Book tempBook = (((Book) itr.next()));

            if (!author.get().isActive() && tempBook.isActive()) { // yazarı sildiysek kitabı da sil
                this.removeBook(tempBook.getId());
            } else if (author.get().isActive() && !tempBook.isActive()) { // yazarı geri eklediysek kitapları da eklensin
                this.removeBook(tempBook.getId());
            }
        }

        return authorRepository.save(author.get());
    }

}
