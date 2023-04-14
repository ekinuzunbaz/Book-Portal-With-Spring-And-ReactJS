package tr.com.obss.jip.BookPortal.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "ROLE")
public class Role extends EntityBase{
    @Column(name = "NAME", length = 255, unique = true)
    private String name;

    @ManyToMany(mappedBy = "roles",cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JsonBackReference
    private Set<User> users;

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
