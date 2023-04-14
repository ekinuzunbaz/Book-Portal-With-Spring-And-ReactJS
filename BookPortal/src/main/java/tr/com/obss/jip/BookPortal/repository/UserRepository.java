package tr.com.obss.jip.BookPortal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tr.com.obss.jip.BookPortal.entity.Book;
import tr.com.obss.jip.BookPortal.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(Long id);

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

/*


    @Query(value = "SELECT * FROM USERS_READ b INNER JOIN User u  ON u.id=b.id", nativeQuery = true)
    List<Book> findReadBooks();*/


}
