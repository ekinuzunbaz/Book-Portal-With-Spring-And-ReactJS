package tr.com.obss.jip.BookPortal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.jip.BookPortal.entity.Author;
import tr.com.obss.jip.BookPortal.entity.Role;

import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    // yazarı çekerken kitaplarını çekemiyor !!!
    Optional<Author> findByName(String name);

    boolean existsByName(String name);
}
