package tr.com.obss.jip.BookPortal.entity;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@MappedSuperclass // bunu yazmayı unutma
public class EntityBase implements Serializable {

    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "CREATE_DATE")
    private Date createDate;

    @Column(name = "UPDATE_DATE")
    private Date updateDate;

    @Column(name = "ACTIVE")
    private boolean active;

    @Column(name = "OPERATION_TYPE")
    private String operationType;

    @PrePersist
    public void onPrePersist() {
        this.setActive(true);
        this.setCreateDate(new Date());
        this.setUpdateDate(new Date());
        this.setOperationType("SAVE");
    }

    @PreUpdate
    public void onPreUpdate() {
        this.setUpdateDate(new Date());
        this.setOperationType("UPDATE");
    }

    @PreRemove
    public void onPreRemove() {
        this.setUpdateDate(new Date());
        this.setOperationType("DELETE");
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getOperationType() {
        return operationType;
    }

    public void setOperationType(String operationType) {
        this.operationType = operationType;
    }
}

