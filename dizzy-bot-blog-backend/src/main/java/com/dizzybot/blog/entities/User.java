package com.dizzybot.blog.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = {"email"})})
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String username;

    private String password;

    private String email;

    @Nullable
    private String linkedInURL;

    @Nullable
    private String phone;

    @Nullable
    private String university;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    private List<Blog> blogs = new ArrayList<Blog>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Experience> experiences = new ArrayList<Experience>();

    @ElementCollection
    @CollectionTable(name = "archived_blogs", joinColumns = @JoinColumn(name = "user_id"))
    private List<Blog> archivedBlogs = new ArrayList<Blog>();

    public User() {}

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public void archiveBlog(Blog blog) {
        this.archivedBlogs.add(blog);
    }

    public void removeArchivedBlog(Blog blog) {
        List<Blog> currentArchivedBlogs = new ArrayList<>(this.archivedBlogs);
        for (Blog b : this.archivedBlogs) {
            if (b.getId() == blog.getId()) {
                currentArchivedBlogs.remove(b);
            }
        }
        this.setArchivedBlogs(currentArchivedBlogs);
    }

}
