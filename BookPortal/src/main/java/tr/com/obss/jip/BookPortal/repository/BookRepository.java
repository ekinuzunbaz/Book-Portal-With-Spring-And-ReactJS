package tr.com.obss.jip.BookPortal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tr.com.obss.jip.BookPortal.dto.BookByCloseProjection;
import tr.com.obss.jip.BookPortal.dto.BookDTO;
import tr.com.obss.jip.BookPortal.entity.Book;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    boolean existsByTitle(String title);

    boolean existsByTitleAndTypeAndAuthorName(String title, String type, String authorName );


    // Projection with argument constructor
    @Query(value = "SELECT new tr.com.obss.jip.BookPortal.dto.BookDTO( b.title, b.type, b.author.name) from Book b")
    List<BookDTO> listBooks();

    Optional<Book> findByTitle(String title); // finds the book with given name

    Optional<Book> findByTitleAndType(String title, String type); // finds the book with given name

    //@Query(value = "SELECT T1.title, T1.type, author.name FROM author INNER JOIN (SELECT *  FROM book INNER JOIN users_fav ON book.id = users_fav.book_id) AS T1 ON T1.aut_id=author.id WHERE T1.user_id = :userID", nativeQuery = true)
    //List<BookByCloseProjection> findFavBooks(long userID);

    /*
    @Modifying
    @Query(value = "delete from User.favoriteList u where u.id=:bookID")
    //@Query(value = "DELETE FROM users_fav where user_id=1 and book_id = 9",nativeQuery = true)
    void removeFavBook(long bookID);

    // olan veriyi çekip collection'ı yolla update et
    @Modifying // database'i modifiye ettiğini söylemelisin
    @Query(value = "INSERT INTO users_fav (user_id,book_id) VALUES (1,8)", nativeQuery = true)
    Integer addFavBook(long bookID);
    */

    // HIBERNATE
    @Query(value = "select f.title as title, f.type as type, f.author.name as authorName from User u inner join u.favoriteList f where u.username=:userName")
    List<BookByCloseProjection> findFavBooks(String userName);


    @Query(value = "select r.title as title, r.type as type, r.author.name as authorName from User u inner join u.readList r where u.username = :userName")
    List<BookByCloseProjection> findReadBooks(String userName);

}
