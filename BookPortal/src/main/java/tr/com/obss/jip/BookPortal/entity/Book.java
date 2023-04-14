package tr.com.obss.jip.BookPortal.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

@Entity
@Table(name = "BOOK")
public class Book extends EntityBase { // Author ile many to one ilişki var
    @Column(name = "TITLE", length = 255, unique = true)
    private String title;

    @Column(name = "TYPE", length = 255)
    private String type;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn(name = "AUT_ID", nullable = false)
    @JsonManagedReference
    private Author author;


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }
}
