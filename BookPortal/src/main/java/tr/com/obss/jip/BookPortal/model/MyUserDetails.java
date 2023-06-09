package tr.com.obss.jip.BookPortal.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.CollectionUtils;
import tr.com.obss.jip.BookPortal.entity.User;


import java.util.Collection;
import java.util.Collections;
import java.util.Objects;

public class MyUserDetails implements UserDetails { // spring'in dilinden konuşmak için kullanırız

    private User user;

    public MyUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { // elimizdeki roleri spring'in anladığı dile çeviriyoz
        if (Objects.nonNull(user) && !CollectionUtils.isEmpty(user.getRoles())) {
            return user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName())).toList();
        }

        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return user.isActive();
    }

    @Override
    public boolean isAccountNonLocked() {
        return user.isActive();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return user.isActive();
    }

    @Override
    public boolean isEnabled() {
        return user.isActive();
    }
}
