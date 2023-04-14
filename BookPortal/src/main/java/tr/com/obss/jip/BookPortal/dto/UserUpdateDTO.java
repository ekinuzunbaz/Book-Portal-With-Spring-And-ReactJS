package tr.com.obss.jip.BookPortal.dto;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserUpdateDTO implements UpdateOp {

    @NotBlank
    @Size(max = 255, min = 3, message = "Please enter a valid username")
    private String userName;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}

