package com.dizzybot.blog.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blogs", uniqueConstraints = {@UniqueConstraint(columnNames = {"id"})})
@Getter
@Setter
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    private String subtitle;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User author;

    @Transient
    private String username;

    @Lob
    private String content;

    private Integer likes;

    @Lob
    @Nullable
    private byte[] image;

    @Transient
    private String imageURL;

    private LocalDateTime date;

    public Blog() {}

    public Blog(String title, String subtitle, User author, String content, Integer likes, LocalDateTime date) {
        this.title = title;
        this.subtitle = subtitle;
        this.author = author;
        this.content = content;
        this.likes = likes;
        this.date = date;
    }

    public void setImage(@Nullable byte[] image) {
        this.image = image;
    }

    public void like() {
        this.likes++;
    }

    public void unlike() {
        this.likes--;
    }

}
