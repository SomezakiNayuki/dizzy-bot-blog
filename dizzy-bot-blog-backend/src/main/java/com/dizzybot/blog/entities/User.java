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
    @Column(name = "blog_id")
    private List<Integer> archivedBlogIds = new ArrayList<Integer>();

    public User() {}

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public void archiveBlog(Integer id) {
        this.archivedBlogIds.add(id);
    }

    public void removeArchivedBlog(Integer id) {
        List<Integer> currentArchivedBlogIds = new ArrayList<>(this.archivedBlogIds);
        for (Integer i : this.archivedBlogIds) {
            if (i == id) {
                currentArchivedBlogIds.remove(i);
            }
        }
        this.setArchivedBlogIds(currentArchivedBlogIds);
    }

}
