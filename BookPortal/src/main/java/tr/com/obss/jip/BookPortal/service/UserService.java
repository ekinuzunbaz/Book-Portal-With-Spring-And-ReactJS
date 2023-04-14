package tr.com.obss.jip.BookPortal.service;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tr.com.obss.jip.BookPortal.dto.AuthorDTO;
import tr.com.obss.jip.BookPortal.dto.BookByCloseProjection;
import tr.com.obss.jip.BookPortal.dto.BookDTO;
import tr.com.obss.jip.BookPortal.dto.UserDTO;
import tr.com.obss.jip.BookPortal.entity.Author;
import tr.com.obss.jip.BookPortal.entity.User;
import tr.com.obss.jip.BookPortal.model.MyUserDetails;
import tr.com.obss.jip.BookPortal.repository.AuthorRepository;
import tr.com.obss.jip.BookPortal.repository.BookRepository;
import tr.com.obss.jip.BookPortal.repository.RoleRepository;
import tr.com.obss.jip.BookPortal.repository.UserRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final BookRepository bookRepository;

    private final RoleRepository roleRepository;

    private final AuthorRepository authorRepository;

    private final PasswordEncoder encoder;


    public UserService(UserRepository userRepository, RoleRepository roleRepository, BookRepository bookRepository, AuthorRepository authorRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.encoder = encoder;
    }

    public UserDTO register(UserDTO userDTO) {
        // aynı isimde kullanıcı yok ise eklemeye izin ver
        if (!userRepository.existsByUsername(userDTO.getUserName())) {
            var user = new User();
            user.setUsername(userDTO.getUserName());
            user.setPassword(encoder.encode(userDTO.getPassword()));
            var userRoleOpt = roleRepository.findByName("ROLE_USER");
            userRoleOpt.ifPresent((userRole) -> {
                user.setRoles(Set.of(userRoleOpt.get()));
            });
            userRepository.save(user);

            return userDTO;
        } else {
            throw new DataIntegrityViolationException("This username is already taken");
        }
    }

    public List<BookDTO> getAllBooks() { // burayı pagination yap sonra
        return bookRepository.listBooks();
    }

    public List<BookByCloseProjection> getFavBooks(String userName) { // burayı pagination yap sonra
        return bookRepository.findFavBooks(userName);
    }

    public List<BookByCloseProjection> getReadBooks(String userName) { // burayı pagination yap sonra
        return bookRepository.findReadBooks(userName);
    }

    public BookDTO findByTitle(String title) { // search book by name
        var bookOpt = bookRepository.findByTitle(title); // optional. Empty or filled

        if (!bookOpt.isPresent()) {
            throw new IllegalArgumentException("Book not found");

        }

        BookDTO bookDTO = new BookDTO();
        bookDTO.setTitle(bookOpt.get().getTitle());
        bookDTO.setType(bookOpt.get().getType());
        bookDTO.setAuthorName(bookOpt.get().getAuthor().getName());

        return bookDTO;
    }


    public void removeFav(String userName, String title) {
        var user = userRepository.findByUsername(userName).get();
        var book = bookRepository.findByTitle(title).get();

        // Listede varsa silsin ve update atsın. Database işlemi yapmasın boşuna
        if (user.getFavoriteList().contains(book)) {
            user.getFavoriteList().remove(book);
            userRepository.save(user);
        } else { // Listede yoksa exception atsın (buna gerek yok gibi zaten sistemde olan kitapları kullancak)
            throw new NoSuchElementException("No record found!");
        }
    }

    public void addFav(String userName, String title) {
        var user = userRepository.findByUsername(userName).get();
        var book = bookRepository.findByTitle(title).get();

        // Listede yoksa eklesin ve update atsın. Database işlemi yapmasın boşuna
        if (!user.getFavoriteList().contains(book)) {
            user.getFavoriteList().add(book);
            userRepository.save(user);
        } else
            throw new DataIntegrityViolationException("Duplicate record found");
    }

    public void removeRead(String userName, String title) {
        var user = userRepository.findByUsername(userName).get();
        var book = bookRepository.findByTitle(title).get();

        // Listede varsa silsin ve update atsın. Database işlemi yapmasın boşuna
        if (user.getReadList().contains(book)) {
            user.getReadList().remove(book);
            userRepository.save(user);
        } else { // Listede yoksa exception atsın (buna gerek yok gibi zaten sistemde olan kitapları kullancak)
            throw new NoSuchElementException("No record found!");
        }
    }

    public void addRead(String userName, String title) {
        var user = userRepository.findByUsername(userName).get();
        var book = bookRepository.findByTitle(title).get();

        // Listede yoksa eklesin ve update atsın. Database işlemi yapmasın boşuna
        if (!user.getReadList().contains(book)) {
            user.getReadList().add(book);
            userRepository.save(user);
        } else
            throw new DataIntegrityViolationException("Duplicate record found");
    }

    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    public AuthorDTO findByName(String name) {
        var authorOpt = authorRepository.findByName(name); // optional. Empty or filled

        if (!authorOpt.isPresent()) {
            throw new IllegalArgumentException("Author not found");

        }

        AuthorDTO authorDTO = new AuthorDTO();
        authorDTO.setName(authorOpt.get().getName());

        return authorDTO;
    }


    public User findByUsername(String username) {
        var userOpt = userRepository.findByUsername(username); // optional. Empty or filled

        return userOpt.orElseThrow(() -> {
            throw new UsernameNotFoundException("User not found");
        });
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = this.findByUsername(username);
        return new MyUserDetails(user);
    }
}
