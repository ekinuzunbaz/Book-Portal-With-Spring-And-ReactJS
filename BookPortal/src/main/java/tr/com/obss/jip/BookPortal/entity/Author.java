package tr.com.obss.jip.BookPortal.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "AUTHOR")
public class Author extends EntityBase { // Book ile 1 to many relation var

    @Column(name = "NAME", length = 255, unique = true)
    private String name;

    @OneToMany(mappedBy = "author", cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JsonBackReference
    private Set<Book> books;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }
}
