---
layout: page
title: Thoughts and Essays
permalink: /thoughts/
islast: true
---

<!--Essays not yet ready for daylight.-->

<ul class="posts">
	{% for res in site.thoughts  %}
        <li>
        <a class="post-link" href="{{ res.url | prepend: site.baseurl | prepend: site.url }}">{{ res.title }}</a>
        <p >{{res.excerpt}}</p>
        <hr />
        </li>
        {% endfor %}
</ul>